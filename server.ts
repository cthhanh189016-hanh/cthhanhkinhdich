import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType } from "docx";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase limit for base64 images
  app.use(express.json({ limit: '10mb' }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Helper to generate content with exponential backoff retries and fallback models to prevent 503/transient errors
  async function generateContentWithRetry(contents: string, systemInstruction?: string) {
    // Rely on official stable models: gemini-3.5-flash is our primary, gemini-3.1-flash-lite as fallback, and gemini-3-flash-preview as last resort
    const models = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-3-flash-preview"];
    let lastError: any = null;

    for (const model of models) {
      const maxRetries = 3;
      let delay = 1000; // Start with 1 second backoff

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`[Gemini API] Prompting model: ${model} (Attempt ${attempt}/${maxRetries})...`);
          const response = await ai.models.generateContent({
            model,
            contents,
            config: systemInstruction ? { systemInstruction } : undefined,
          });

          if (response && response.text) {
            console.log(`[Gemini API] Successfully generated response with model: ${model}`);
            return response;
          }
          throw new Error("Empty text in Gemini response");
        } catch (error: any) {
          lastError = error;
          const status = error?.status || error?.error?.status || error?.code || error?.error?.code;
          const msg = error?.message || error?.error?.message || "";
          
          console.warn(
            `[Gemini API Warning] Model ${model} (Attempt ${attempt}/${maxRetries}) failed. Status: ${status}. Detail: ${msg}`
          );

          // For standard API errors that are non-retryable (like 400 Bad Request, invalid key)
          if (status === 400 || (typeof status === 'number' && status >= 400 && status < 500 && status !== 429)) {
            console.error(`[Gemini API Error] Non-retryable error encountered on model ${model}. Moving to next option.`);
            break; 
          }

          if (attempt < maxRetries) {
            console.log(`[Gemini API] Waiting ${delay}ms before retrying...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2; // Exponential base
          }
        }
      }
    }

    throw lastError || new Error("Failed to generate content with all configured Gemini models");
  }

  // API to get AI interpretation for a hexagram
  app.post("/api/interpret", async (req, res) => {
    const { hexagramName, aspect, extraInfo } = req.body;

    if (!hexagramName) {
      return res.status(400).json({ error: "Hexagram name is required" });
    }

    try {
      const prompt = `Bạn là một chuyên gia giải mã Kinh Dịch uyên bác. 
Hãy giải quẻ "${hexagramName}" cho phương diện "${aspect}".
Thông tin thêm từ người dùng: "${extraInfo || "Không có"}".

Vui lòng cung cấp:
1. Ý nghĩa tổng quát của quẻ (ngắn gọn, súc tích).
2. Lời khuyên chi tiết cho phương diện "${aspect}".
3. Một câu châm ngôn hoặc hành động cụ thể để cải vận.

Trả lời bằng tiếng Việt, định dạng Markdown. Trình bày thanh nhã, dễ hiểu.`;

      const response = await generateContentWithRetry(prompt);

      res.json({ interpretation: response.text });
    } catch (error: any) {

      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Không thể giải quẻ vào lúc này. Vui lòng thử lại sau." });
    }
  });

  // API to export word document
  app.post("/api/export-word", async (req, res) => {
    const { title, image_base64, overview, career, love, warning } = req.body;

    try {
      // Remove base64 prefix
      const base64Data = image_base64.replace(/^data:image\/png;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Define Luxury Colors
      const COLOR_BURGUNDY = "7E2217"; // Burgundy for main title
      const COLOR_GOLD = "C5A059";     // Gold for section headers
      const COLOR_TEXT = "282828";     // Deep charcoal for readability

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: {
                font: "Times New Roman",
                color: COLOR_TEXT,
              },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1134,    // 2.0 cm (2 * 567 twips)
                  bottom: 1134, // 2.0 cm
                  left: 1701,   // 3.0 cm
                  right: 851,   // 1.5 cm
                },
              },
            },
            children: [
              // 1. MAIN TITLE
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 360 }, // 18pt
                children: [
                  new TextRun({
                    text: title,
                    size: 40, // 20pt
                    bold: true,
                    color: COLOR_BURGUNDY,
                  }),
                ],
              }),

              // 2. HEXAGRAM IMAGE
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 360 }, // 18pt
                children: [
                  new ImageRun({
                    data: imageBuffer,
                    transformation: {
                      width: 284, // 7.5 cm (7.5 / 2.54 * 96 dpi)
                      height: 284,
                    },
                  } as any),
                ],
              }),

              // 3. OVERVIEW SECTION
              new Paragraph({
                spacing: { before: 240, after: 60 }, // 12pt before, 3pt after
                children: [
                  new TextRun({
                    text: "TỔNG QUAN TƯỢNG QUẺ",
                    size: 26, // 13pt
                    bold: true,
                    color: COLOR_GOLD,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { 
                  line: 340, // 17pt (0.6cm) fixed
                  lineRule: "exactly" as any,
                  after: 200 // 10pt
                },
                children: [
                  new TextRun({
                    text: overview,
                    size: 22, // 11pt
                  }),
                ],
              }),

              // 4. CAREER SECTION
              new Paragraph({
                spacing: { before: 240, after: 60 },
                children: [
                  new TextRun({
                    text: "CÔNG DANH & SỰ NGHIỆP",
                    size: 26,
                    bold: true,
                    color: COLOR_GOLD,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { 
                  line: 340,
                  lineRule: "exactly" as any,
                  after: 200
                },
                children: [
                  new TextRun({
                    text: career || "Bản luận giải đang được cập nhật...",
                    size: 22,
                  }),
                ],
              }),

              // 5. LOVE SECTION
              new Paragraph({
                spacing: { before: 240, after: 60 },
                children: [
                  new TextRun({
                    text: "TÌNH DUYÊN & GIA ĐẠO",
                    size: 26,
                    bold: true,
                    color: COLOR_GOLD,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { 
                  line: 340,
                  lineRule: "exactly" as any,
                  after: 200
                },
                children: [
                  new TextRun({
                    text: love || "Bản luận giải đang được cập nhật...",
                    size: 22,
                  }),
                ],
              }),

              // 6. WARNING SECTION
              new Paragraph({
                spacing: { before: 240, after: 60 },
                children: [
                  new TextRun({
                    text: "LỜI KHUYÊN & CẢNH BÁO",
                    size: 26,
                    bold: true,
                    color: COLOR_GOLD,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { 
                  line: 340,
                  lineRule: "exactly" as any,
                  after: 200
                },
                children: [
                  new TextRun({
                    text: warning || "Bản luận giải đang được cập nhật...",
                    size: 22,
                  }),
                ],
              }),

              // 7. FOOTER
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 800 },
                children: [
                  new TextRun({
                    text: "© Bản quyền Hạnh Châu - Kinh Dịch Linh Quẻ Chiêm Bái",
                    size: 18, // 9pt
                    italics: true,
                    color: "888888",
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", "attachment; filename=Luan_Que_Kinh_Dich_Thuong_Luu.docx");
      res.send(buffer);
    } catch (error) {
      console.error("Export Word Error:", error);
      res.status(500).json({ error: "Lỗi xuất file Word." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
