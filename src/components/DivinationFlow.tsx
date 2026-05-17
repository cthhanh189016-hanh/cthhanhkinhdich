import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HexagramDisplay } from './HexagramDisplay';
import { generateLines, linesToBinary, getHexagramByBinary, getChangingLines, getTrigrams, type Hexagram } from '../lib/hexagrams';
import { Sparkles, Coins, RefreshCw, ArrowRight, Download, FileText, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import html2canvas from 'html2canvas';
import { cn } from '../lib/utils';

const ASPECTS = [
  { id: 'career', label: 'Công danh/Sự nghiệp', icon: '💼' },
  { id: 'love', label: 'Tình duyên/Gia đạo', icon: '❤️' },
  { id: 'wealth', label: 'Tài lộc/Kinh doanh', icon: '💰' },
  { id: 'health', label: 'Sức khỏe/Hành trình', icon: '🏃' },
];

export const DivinationFlow: React.FC = () => {
  const [step, setStep] = useState<'aspect' | 'toss' | 'result'>('aspect');
  const [selectedAspect, setSelectedAspect] = useState(ASPECTS[0]);
  const [question, setQuestion] = useState('');
  const [lines, setLines] = useState<number[]>([]);
  const [isTossing, setIsTossing] = useState(false);
  const [hexagram, setHexagram] = useState<Hexagram | null>(null);
  const [interpretation, setInterpretation] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleStartToss = () => {
    setStep('toss');
  };

  const handleToss = () => {
    setIsTossing(true);
    setTimeout(() => {
      const newLines = generateLines();
      setLines(newLines);
      const binary = linesToBinary(newLines);
      const res = getHexagramByBinary(binary);
      setHexagram(res || null);
      setIsTossing(false);
    }, 1500);
  };

  const handleGetInterpretation = async () => {
    if (!hexagram) return;
    setIsLoadingAi(true);
    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hexagramName: hexagram.vietnamese,
          aspect: selectedAspect.label,
          extraInfo: question,
        }),
      });
      const data = await response.json();
      setInterpretation(data.interpretation);
      setStep('result');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const reset = () => {
    setStep('aspect');
    setLines([]);
    setHexagram(null);
    setInterpretation('');
    setQuestion('');
  };

  const handleExportWord = async () => {
    if (!hexagram) return;
    setIsExporting(true);
    try {
      const element = document.getElementById('iching-export-card');
      if (!element) return;
      
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#0E1111' });
      const imageBase64 = canvas.toDataURL('image/png');
      
      const payload = {
        title: `QUẺ SỐ ${hexagram.id}: ${hexagram.vietnamese}`,
        image_base64: imageBase64,
        overview: hexagram.meaning,
        career: selectedAspect.id === 'career' ? interpretation : interpretation.slice(0, 300) + "...",
        love: selectedAspect.id === 'love' ? interpretation : "Giao hòa cảm ứng, tùy duyên mà định.",
        warning: "Thái cực tất bĩ — Khi ở đỉnh cao hãy giữ khiêm tốn, khi bĩ cực hãy vững lòng tin."
      };

      const response = await fetch('/api/export-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Luan_Que_${hexagram.vietnamese}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportHtml = () => {
    if (!hexagram) return;
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linh Quẻ Chiêm Bái - ${hexagram.vietnamese}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        :root { --gold: #C5A059; --obsidian: #0E1111; --ivory: #F5F5F0; }
        body { background: var(--ivory); color: var(--obsidian); font-family: 'Inter', sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
        .card { max-width: 800px; margin: 40px auto; background: white; padding: 60px; border-radius: 40px; border: 1px solid rgba(197,160,89,0.2); box-shadow: 0 30px 60px rgba(0,0,0,0.05); }
        h1 { font-family: 'Playfair Display', serif; font-size: 48px; margin: 0; text-transform: uppercase; letter-spacing: -1px; text-align: center; }
        .subtitle { text-align: center; color: var(--gold); font-family: 'Playfair Display', serif; font-style: italic; font-size: 20px; margin-top: 10px; }
        .hexagram { padding: 40px 0; text-align: center; }
        .interpretation { margin-top: 40px; font-family: 'Playfair Display', serif; font-size: 18px; color: rgba(14,17,17,0.8); }
        .interpretation h3 { color: var(--gold); text-transform: uppercase; font-size: 14px; letter-spacing: 2px; }
        .interpretation blockquote { border-left: 2px solid var(--gold); padding-left: 20px; font-style: italic; margin: 20px 0; }
        .footer { text-align: center; margin-top: 60px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); }
    </style>
</head>
<body>
    <div class="card">
        <h1>${hexagram.vietnamese}</h1>
        <div class="subtitle">Quẻ số ${hexagram.id}: ${hexagram.pinyin}</div>
        
        <div class="hexagram">
            <div style="font-size: 80px; color: var(--gold)">☯</div>
            <p style="font-style: italic; color: var(--gold)">"${hexagram.image}"</p>
        </div>

        <div class="interpretation">
            <h3>TỔNG QUAN BẢN THỂ</h3>
            <p>${hexagram.meaning}</p>
            
            <hr style="border: none; border-top: 1px solid rgba(197,160,89,0.1); margin: 40px 0;">
            
            <h3>GIẢI MÃ THIÊN CƠ</h3>
            <div style="white-space: pre-wrap;">${interpretation}</div>
        </div>

        <div class="footer">
            © Bản quyền Hạnh Châu - Kinh Dịch Linh Quẻ Chiêm Bái
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LinhQue_${hexagram.vietnamese}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4 md:px-6 text-obsidian">
      <AnimatePresence mode="wait">
        {step === 'aspect' && (
          <motion.div
            key="aspect"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="space-y-10 md:space-y-16 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-light text-obsidian tracking-tight">Tĩnh Tâm & Khởi Ý</h2>
              <p className="text-gold-matte italic font-serif text-base md:text-lg px-2">Hãy hít thở sâu, tập trung vào điều bạn trăn trở nhất...</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {ASPECTS.map((aspect) => (
                <button
                  key={aspect.id}
                  onClick={() => setSelectedAspect(aspect)}
                  className={cn(
                    "p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 transition-all duration-500 flex flex-col items-center gap-3 md:gap-4 relative overflow-hidden group",
                    selectedAspect.id === aspect.id 
                      ? "bg-gold-matte text-ivory border-gold-matte shadow-[0_15px_40px_rgba(197,160,89,0.15)] scale-105" 
                      : "bg-white/40 text-obsidian/80 border-gold-matte/10 hover:border-gold-matte/30 hover:bg-white"
                  )}
                >
                  <span className="text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110">{aspect.icon}</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{aspect.label}</span>
                  {selectedAspect.id === aspect.id && (
                    <motion.div 
                      layoutId="outline"
                      className="absolute inset-0 border-2 border-gold-bright/30 rounded-2xl md:rounded-3xl"
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
              <label className="block text-[8px] md:text-[10px] font-bold text-gold-matte uppercase tracking-[0.4em] text-left ml-2 md:ml-2">Khấn nguyện & Đặt câu hỏi</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Lòng thành dẫn lối, hãy thầm khấn điều bạn trăn trở..."
                className="w-full p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 border-gold-matte/10 bg-white/40 focus:bg-white focus:ring-4 focus:ring-gold-matte/5 focus:border-gold-matte/40 transition-all outline-none min-h-[140px] md:min-h-[160px] resize-none font-serif text-lg md:text-xl text-obsidian placeholder:text-obsidian/40 italic shadow-inner"
              />
            </div>

            <button
              onClick={handleStartToss}
              className="group relative inline-flex w-full md:w-auto items-center justify-center gap-4 px-12 py-5 md:py-6 bg-obsidian text-ivory rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gold-matte/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-bright/0 via-gold-bright/20 to-gold-bright/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Vào Đền Gieo Quẻ</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </motion.div>
        )}

        {step === 'toss' && (
          <motion.div
            key="toss"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center space-y-12 md:space-y-16 min-h-[500px] md:min-h-[600px]"
          >
            <div className="text-center space-y-4 md:space-y-6 px-4">
              <h2 className="text-2xl md:text-4xl font-display text-obsidian tracking-wider uppercase">Đang Gieo Linh Quẻ</h2>
              <p className="text-gold-matte font-serif italic text-lg md:text-xl">Lòng thành khẩn cầu cho sự việc: {selectedAspect.label}</p>
            </div>

            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Spiritual circle backdrop */}
              <div className="absolute inset-0 border-[1px] border-gold-matte/20 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-6 md:inset-8 border-[1px] border-gold-matte/40 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-12 md:inset-16 border-[1px] border-gold-matte/10 rounded-full animate-[spin_40s_linear_infinite]" />
              
              <AnimatePresence>
                {isTossing ? (
                  <motion.div
                    key="coins"
                    initial={{ rotate: 0, scale: 0.8 }}
                    animate={{ rotate: 360 * 3, scale: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="flex gap-8 md:gap-12 relative z-10"
                  >
                    {[1, 2].map((i) => (
                      <motion.div 
                        key={i} 
                        animate={{ y: [0, -40, 0], rotateY: [0, 180, 360] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                        className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold-bright to-gold-matte rounded-full shadow-[0_15px_35px_rgba(197,160,89,0.4)] flex items-center justify-center border-2 border-gold-bright/30 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-obsidian text-3xl md:text-4xl font-bold font-serif">
                          ☯
                        </div>
                        <div className="absolute inset-1.5 md:inset-2 border border-obsidian/10 rounded-full" />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="static"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-10 relative z-10"
                  >
                    {!hexagram ? (
                      <div className="relative group cursor-pointer" onClick={handleToss}>
                        {/* Đài Âm Dương Chuyển Động */}
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-4 border-gold-matte/30 shadow-[0_0_40px_rgba(197,160,89,0.15)] overflow-hidden bg-ivory"
                        >
                          {/* Yin Yang Shape */}
                          <div className="absolute top-0 left-0 w-1/2 h-full bg-obsidian" />
                          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 rounded-full bg-obsidian" />
                          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 rounded-full bg-ivory" />
                          <div className="absolute top-[18.75%] left-[43.75%] w-[12.5%] h-[12.5%] rounded-full bg-ivory" />
                          <div className="absolute bottom-[18.75%] left-[43.75%] w-[12.5%] h-[12.5%] rounded-full bg-obsidian" />
                          
                          {/* Overlays for depth */}
                          <div className="absolute inset-0 rounded-full shadow-inner" />
                        </motion.div>

                        {/* 2 Đồng Xu Âm Dương */}
                        <div className="absolute inset-0 flex items-center justify-center gap-4 md:gap-6 pointer-events-none">
                          <motion.div 
                            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold-bright to-gold-matte rounded-full shadow-2xl flex items-center justify-center border border-gold-bright/30 group-hover:scale-110 transition-transform duration-500"
                          >
                            <span className="text-obsidian text-xl md:text-2xl font-bold">☯</span>
                          </motion.div>
                          <motion.div 
                            animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold-bright to-gold-matte rounded-full shadow-2xl flex items-center justify-center border border-gold-bright/30 group-hover:scale-110 transition-transform duration-500"
                          >
                            <span className="text-obsidian text-xl md:text-2xl font-bold">☯</span>
                          </motion.div>
                        </div>
                        
                        <div className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-max">
                           <span className="px-5 md:px-6 py-2 bg-obsidian text-ivory rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl group-hover:bg-gold-matte group-hover:text-obsidian transition-colors">Khai Đài Gieo Quẻ</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-8 md:gap-12 w-full px-4">
                        <HexagramDisplay binary={linesToBinary(lines)} size="lg" className="drop-shadow-[0_0_15px_rgba(197,160,89,0.15)] scale-90 md:scale-100" />
                        <div className="text-center space-y-2 md:space-y-4">
                          <p className="text-gold-matte/40 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.6em]">Linh Ứng Hiện Tiền</p>
                          <p className="text-4xl md:text-5xl font-display text-obsidian tracking-tight">{hexagram.vietnamese}</p>
                        </div>
                        <button
                          onClick={handleGetInterpretation}
                          disabled={isLoadingAi}
                          className="flex items-center justify-center w-full md:w-auto gap-4 px-12 py-5 md:py-6 bg-obsidian text-ivory rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-gold-matte/20 disabled:opacity-50 font-bold uppercase tracking-[0.2em] text-[10px]"
                        >
                          {isLoadingAi ? (
                            <>
                              <RefreshCw className="w-5 h-5 animate-spin" />
                              <span>Thỉnh Ý Thiên Cơ...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 text-gold-bright" />
                              <span>Giải Mã Thiên Cơ</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {step === 'result' && hexagram && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10 md:space-y-16 pb-12 md:pb-20"
          >
            <div className="bg-paper-light rounded-[2rem] md:rounded-[3rem] p-6 md:p-20 shadow-2xl border-gold-matte/10 space-y-12 md:space-y-20 relative overflow-hidden">
               {/* Decorative corners - hidden on small mobile */}
               <div className="hidden sm:block absolute top-0 left-0 w-32 h-32 border-t border-l border-gold-matte/10 rounded-tl-[3rem]" />
               <div className="hidden sm:block absolute bottom-0 right-0 w-32 h-32 border-b border-r border-gold-matte/10 rounded-br-[3rem]" />
               
               <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 relative z-10 w-full">
                  <div className="flex flex-col items-center gap-8 md:gap-12 w-full lg:w-auto">
                    <div className="relative group">
                      <div className="p-8 md:p-12 bg-white/60 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gold-matte/10 relative z-10 backdrop-blur-md">
                        <HexagramDisplay binary={hexagram.binary} changingLines={getChangingLines(lines)} size="lg" className="drop-shadow-[0_0_20px_rgba(197,160,89,0.15)] scale-90 md:scale-100" />
                      </div>
                    </div>
                    <div className="text-center">
                       <h1 className="text-4xl md:text-6xl font-display text-obsidian mb-2 md:mb-4 drop-shadow-sm uppercase tracking-tight">{hexagram.vietnamese}</h1>
                       <p className="text-gold-matte font-serif italic text-lg md:text-xl items-center inline-flex gap-3 md:gap-4">
                         <span className="w-8 md:w-12 h-px bg-gold-matte/20" />
                         Quẻ thứ {hexagram.id}: {hexagram.pinyin}
                         <span className="w-8 md:w-12 h-px bg-gold-matte/20" />
                       </p>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-8 md:space-y-12 w-full text-center lg:text-left">
                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.6em] text-gold-matte/40">Tượng Quẻ</h4>
                      <p className="text-2xl md:text-4xl font-display text-obsidian leading-tight italic drop-shadow-sm font-light">“{hexagram.image}”</p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.6em] text-gold-matte/40">Tổng Quan Bản Thể</h4>
                      <p className="text-obsidian/90 leading-relaxed text-lg md:text-xl font-serif italic">{hexagram.meaning}</p>
                    </div>
                  </div>
               </div>

               <div className="relative z-10 pt-6 md:pt-10">
                 <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                   <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-matte/30 to-transparent" />
                   <span className="text-[8px] md:text-[10px] font-bold text-gold-matte uppercase tracking-[0.6em] px-6 md:px-10 py-2 md:py-3 bg-white/40 rounded-full border border-gold-matte/20 backdrop-blur-sm text-center">Thánh Ý Chiêm Giải</span>
                   <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-matte/30 to-transparent" />
                 </div>
                 <div className="bg-white/40 p-6 md:p-16 rounded-[1.5rem] md:rounded-[2.5rem] text-obsidian leading-loose font-serif text-lg md:text-2xl shadow-inner border border-gold-matte/10 backdrop-blur-sm overflow-hidden">
                    <div className="prose prose-neutral prose-p:italic prose-p:text-obsidian/80 prose-headings:font-display prose-headings:text-obsidian prose-headings:tracking-wider prose-headings:uppercase prose-headings:text-base md:prose-headings:text-lg max-w-none prose-blockquote:border-gold-matte/30 prose-strong:text-gold-matte">
                      <ReactMarkdown>{interpretation}</ReactMarkdown>
                    </div>
                 </div>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
              <button
                onClick={reset}
                className="flex items-center justify-center gap-3 md:gap-4 px-8 md:px-12 py-5 md:py-6 border border-gold-matte/20 rounded-full text-gold-matte/60 hover:text-gold-matte hover:border-gold-matte/60 hover:bg-white transition-all duration-500 font-bold uppercase tracking-[0.3em] text-[10px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Khởi Chuyển Vận Mệnh</span>
              </button>

              <button
                onClick={handleExportWord}
                disabled={isExporting}
                className="flex items-center justify-center gap-3 md:gap-4 px-8 md:px-12 py-5 md:py-6 bg-obsidian text-ivory rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 font-bold uppercase tracking-[0.3em] text-[10px]"
              >
                {isExporting ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-gold-bright" />
                ) : (
                  <FileText className="w-4 h-4 text-gold-bright" />
                )}
                <span>TẢI BẢN LUẬN QUẺ (.DOCX)</span>
              </button>

              <button
                onClick={handleExportHtml}
                className="flex items-center justify-center gap-3 md:gap-4 px-8 md:px-12 py-5 md:py-6 bg-white text-obsidian border-2 border-obsidian rounded-full hover:bg-obsidian hover:text-ivory transition-all hover:scale-105 active:scale-95 shadow-xl font-bold uppercase tracking-[0.3em] text-[10px]"
              >
                <Share2 className="w-4 h-4 text-gold-matte" />
                <span>LƯU TRANG OFFLINE (.HTML)</span>
              </button>
            </div>


            {/* Hidden export card for html2canvas */}
            <div className="fixed -left-[9999px] top-0 pointer-events-none">
              <div id="iching-export-card" style={{ background: '#0E1111', padding: '40px', border: '1px solid #C5A059', textAlign: 'center', width: '380px' }}>
                <h3 style={{ color: '#C5A059', fontFamily: "'Times New Roman', serif", letterSpacing: '1px', margin: '0 0 20px 0', fontSize: '18px', textTransform: 'uppercase' }}>
                    QUẺ SỐ {hexagram?.id}: {hexagram?.vietnamese}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', margin: '30px 0' }}>
                    {/* Manual lines for export if component styles are tricky */}
                    <div className="flex flex-col-reverse gap-3">
                      {hexagram?.binary.split('').map((line, i) => (
                        <div key={i} className="flex gap-4">
                          {line === '1' ? (
                            <div style={{ height: '5px', width: '160px', background: '#C5A059', opacity: '0.8' }}></div>
                          ) : (
                            <>
                              <div style={{ height: '5px', width: '72px', background: '#C5A059', opacity: '0.8' }}></div>
                              <div style={{ height: '5px', width: '72px', background: '#C5A059', opacity: '0.8' }}></div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                </div>
                
                <p style={{ color: '#F5F5F0', fontSize: '13px', fontStyle: 'italic', fontFamily: 'serif', margin: '20px 0' }}>
                    "{hexagram?.image}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
