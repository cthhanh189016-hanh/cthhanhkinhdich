/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DivinationFlow } from './components/DivinationFlow';
import { HexagramLibrary } from './components/HexagramLibrary';
import { motion } from 'motion/react';
import { Scroll, Compass, BookOpen, Info, Github } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'divination' | 'library' | 'about'>('divination');

  return (
    <div className="min-h-screen bg-ivory text-obsidian font-sans selection:bg-gold-matte/20">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.15] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gold-matte/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cinnabar/5 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-xl border-b border-gold-matte/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-5">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-gold-matte text-2xl md:text-4xl border border-gold-matte/20 shadow-[0_0_15px_rgba(197,160,89,0.05)] bg-white/50"
             >
                ☯
             </motion.div>
             <div className="flex flex-col">
               <h1 className="text-lg md:text-2xl font-display font-medium tracking-tight text-obsidian leading-none uppercase">Kinh Dịch</h1>
               <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-gold-matte font-semibold mt-1">Linh Quẻ Chiêm Bái</span>
             </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
             <NavButton active={activeTab === 'divination'} onClick={() => setActiveTab('divination')} icon={Scroll}>Gieo Quẻ</NavButton>
             <NavButton active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon={BookOpen}>Tràng Kinh Các</NavButton>
             <NavButton active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={Info}>Điển Tích</NavButton>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
             <a href="#" className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
               <Github className="w-5 h-5" />
             </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-160px)] pb-24 md:pb-0">
        {activeTab === 'divination' && (
           <section className="py-10 md:py-20">
             <div className="text-center max-w-2xl mx-auto px-4 md:px-6 mb-10 md:mb-16">
               <motion.span 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-[8px] md:text-[10px] font-bold text-gold-matte uppercase tracking-[0.4em] mb-4 md:mb-6 block"
               >
                 Trí Tuệ Cổ Xưa • Linh Quẻ Chiêm Giải
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-2xl md:text-6xl font-display font-medium text-obsidian mb-6 md:mb-8 drop-shadow-sm uppercase md:normal-case"
               >
                 Thành Tâm Gieo Quẻ, Khai Thông Tâm Trí
               </motion.h2>
               <motion.p 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="text-obsidian/80 leading-relaxed md:leading-loose text-base md:text-lg font-serif italic"
               >
                 Gieo quẻ để tìm kiếm sự bình tâm, sáng suốt và những lời khuyên sâu sắc từ Kinh Dịch cho mọi khía cạnh trong cuộc sống.
               </motion.p>
             </div>
             
             <DivinationFlow />
           </section>
        )}

        {activeTab === 'library' && (
          <HexagramLibrary />
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-20 space-y-8 md:space-y-12">
             <h3 className="text-3xl md:text-4xl font-display text-obsidian border-b border-gold-matte/10 pb-6 uppercase tracking-wider">Kinh Dịch Vạn Vật</h3>
             <div className="space-y-6 md:space-y-8 text-obsidian/80 leading-relaxed text-lg md:text-xl font-serif">
               <p>
                 Kinh Dịch không chỉ là một hệ thống bói toán mà còn là bộ triết học về sự biến đổi của vạn vật. Thông qua 64 quẻ, Kinh Dịch mô tả quy luật vận động của tự nhiên và xã hội, giúp con người hiểu rõ thời thế để sống thuận đạo.
               </p>
               <div className="bg-white/40 p-8 md:p-12 rounded-3xl border border-gold-matte/10 italic text-gold-matte/80 shadow-inner backdrop-blur-sm">
                 "Mọi việc trên đời đều có lúc thịnh lúc suy, quan trọng là tâm thế của ta đối diện với nó."
               </div>
             </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-ivory/95 backdrop-blur-lg border-t border-gold-matte/10 px-4 py-3 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <MobileNavButton active={activeTab === 'divination'} onClick={() => setActiveTab('divination')} icon={Scroll} label="Gieo Quẻ" />
        <MobileNavButton active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon={BookOpen} label="Thư Viện" />
        <MobileNavButton active={activeTab === 'about'} onClick={() => setActiveTab('about')} icon={Info} label="Điển Tích" />
      </div>

      {/* Footer */}
      <footer className="border-t border-gold-matte/5 py-10 md:py-16 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-3 opacity-80">
             <span className="text-2xl text-gold-matte">☯</span>
             <span className="text-xs md:text-sm font-display tracking-widest uppercase text-obsidian">Kinh Dịch - Linh Quẻ Chiêm Bái • 2026</span>
          </div>
          <div className="text-[8px] md:text-[10px] text-obsidian/50 max-w-md uppercase tracking-[0.1em] md:tracking-[0.2em] leading-loose">
            Tâm thành tắc linh • Bản quyền Hạnh Châu • Liên hệ: 0376363205
          </div>
        </div>
      </footer>
    </div>
  );
}

function MobileNavButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1">
      <div className={cn(
        "p-2 rounded-xl transition-all duration-300",
        active ? "bg-obsidian text-ivory shadow-lg" : "text-obsidian/40"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={cn(
        "text-[8px] font-bold uppercase tracking-widest transition-colors duration-300",
        active ? "text-obsidian" : "text-obsidian/40"
      )}>{label}</span>
    </button>
  );
}

function NavButton({ children, active, onClick, icon: Icon }: { children: React.ReactNode, active: boolean, onClick: () => void, icon: any }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-2
        ${active 
          ? 'bg-obsidian text-ivory shadow-lg shadow-gold-matte/10' 
          : 'text-obsidian/60 hover:text-obsidian hover:bg-gold-matte/5'}
      `}
    >
      <Icon className="w-3.5 h-3.5" />
      {children}
    </button>
  );
}

