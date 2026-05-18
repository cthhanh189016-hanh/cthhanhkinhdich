import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HexagramDisplay } from './HexagramDisplay';
import { generateLines, linesToBinary, getHexagramByBinary, getChangingLines, getTrigrams, type Hexagram } from '../lib/hexagrams';
import { Sparkles, Coins, RefreshCw, ArrowRight, Download, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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

  const handleExportPDF = async () => {
    if (!hexagram) return;
    setIsExporting(true);
    try {
      const element = document.getElementById('iching-export-card');
      if (!element) return;
      
      const canvas = await html2canvas(element, { scale: 3, backgroundColor: '#1A0F0E' });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 3, canvas.height / 3]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3);
      pdf.save(`Luan_Que_${hexagram.vietnamese}.pdf`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(false);
    }
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
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center justify-center gap-3 md:gap-4 px-8 md:px-12 py-5 md:py-6 bg-obsidian text-ivory rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 font-bold uppercase tracking-[0.3em] text-[10px]"
              >
                {isExporting ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-gold-bright" />
                ) : (
                  <FileText className="w-4 h-4 text-gold-bright" />
                )}
                <span>TẢI BẢN LUẬN QUẺ (.PDF)</span>
              </button>
            </div>


            {/* Hidden export card for html2canvas */}
            <div className="fixed -left-[9999px] top-0 pointer-events-none">
              <div id="iching-export-card" style={{ background: '#1A0F0E', padding: '60px', border: '2px solid #B0894B', textAlign: 'center', width: '500px' }}>
                <h2 style={{ color: '#B0894B', fontFamily: "'Playfair Display', serif", letterSpacing: '2px', margin: '0 0 10px 0', fontSize: '10px', textTransform: 'uppercase' }}>
                    Kinh Dịch - Linh Quẻ Chiêm Bái
                </h2>
                <h3 style={{ color: '#E7DCD3', fontFamily: "'Playfair Display', serif", letterSpacing: '1px', margin: '0 0 30px 0', fontSize: '24px', textTransform: 'uppercase', borderBottom: '1px solid rgba(176,137,75,0.3)', paddingBottom: '20px' }}>
                    QUẺ SỐ {hexagram?.id}: {hexagram?.vietnamese}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', margin: '40px 0' }}>
                    <div className="flex flex-col-reverse gap-4">
                      {hexagram?.binary.split('').map((line, i) => (
                        <div key={i} className="flex gap-5">
                          {line === '1' ? (
                            <div style={{ height: '8px', width: '220px', background: '#B0894B' }}></div>
                          ) : (
                            <>
                              <div style={{ height: '8px', width: '100px', background: '#B0894B' }}></div>
                              <div style={{ height: '8px', width: '100px', background: '#B0894B' }}></div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                </div>
                
                <div style={{ textAlign: 'left', margin: '40px 0', borderTop: '1px solid rgba(176,137,75,0.2)', paddingTop: '30px' }}>
                  <h4 style={{ color: '#B0894B', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 10px 0' }}>Tượng Quẻ</h4>
                  <p style={{ color: '#E7DCD3', fontSize: '18px', fontStyle: 'italic', fontFamily: 'serif', margin: '0 0 30px 0' }}>
                      "{hexagram?.image}"
                  </p>
                  
                  <h4 style={{ color: '#B0894B', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 10px 0' }}>Tổng Quan</h4>
                  <p style={{ color: '#E7DCD3', fontSize: '14px', fontFamily: 'serif', lineHeight: '1.6', margin: '0 0 30px 0', opacity: '0.9' }}>
                      {hexagram?.meaning}
                  </p>

                  <h4 style={{ color: '#B0894B', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '4px', margin: '0 0 10px 0' }}>Thánh Ý Chiêm Giải ({selectedAspect.label})</h4>
                  <div style={{ color: '#E7DCD3', fontSize: '13px', fontFamily: 'serif', lineHeight: '1.8', opacity: '0.8' }}>
                    <ReactMarkdown>{interpretation}</ReactMarkdown>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(176,137,75,0.2)', paddingTop: '20px', marginTop: '40px' }}>
                  <p style={{ color: '#B0894B', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    Bản quyền Hạnh Châu • Linh Quẻ Chiêm Bái
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
