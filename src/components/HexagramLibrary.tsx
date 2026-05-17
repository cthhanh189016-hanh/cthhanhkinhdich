import React, { useState } from 'react';
import { HEXAGRAMS, getTrigrams, type Hexagram } from '../lib/hexagrams';
import { HexagramDisplay } from './HexagramDisplay';
import { Search, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const HexagramLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const hexagramList = Object.values(HEXAGRAMS);
  const filtered = hexagramList.filter(h => 
    h.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.id.toString() === searchTerm
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 space-y-12 md:space-y-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 border-b border-gold-matte/10 pb-10 md:pb-16">
        <div className="space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[8px] md:text-[10px] font-bold text-gold-matte uppercase tracking-[0.6em]"
          >
            Tràng Kinh Các
          </motion.span>
          <h2 className="text-3xl md:text-7xl font-display text-obsidian tracking-tight uppercase">Thư Viện 64 Quẻ</h2>
          <p className="text-gold-matte/60 font-serif italic text-lg md:text-xl">Tra cứu đồ hình và tôn tượng của các quẻ trong Kinh Dịch.</p>
        </div>
        
        <div className="relative w-full md:w-[28rem] group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-matte/20 group-focus-within:text-gold-matte transition-colors" />
          <input 
            type="text" 
            placeholder="Tìm theo tên quẻ hoặc số..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 bg-white/40 border-2 border-gold-matte/10 rounded-[1.5rem] md:rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-gold-matte/5 focus:border-gold-matte/40 focus:bg-white transition-all font-serif text-base md:text-lg text-obsidian placeholder:text-obsidian/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        {filtered.map((h) => (
          <motion.div 
            layout
            key={h.id} 
            className="group active:scale-95 transition-all duration-300"
          >
            <div className="bg-white/40 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gold-matte/10 group-hover:border-gold-matte/30 group-hover:shadow-[0_20px_40px_rgba(197,160,89,0.1)] transition-all duration-700 relative overflow-hidden h-full flex flex-col backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gold-matte/5 rounded-bl-[3rem] md:rounded-bl-[4rem] -mr-6 -mt-6 md:-mr-8 md:-mt-8 transition-colors group-hover:bg-gold-matte/10" />
              
              <div className="flex justify-between items-start mb-6 md:mb-10 relative z-10">
                <span className="text-[10px] font-bold text-gold-matte/20 group-hover:text-gold-matte/60 transition-colors tracking-[0.2em]">#{h.id.toString().padStart(2, '0')}</span>
                <div className="scale-75 md:scale-90 origin-right transition-transform group-hover:scale-100 group-hover:rotate-1">
                  <HexagramDisplay binary={h.binary} size="sm" />
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-6 relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-display text-obsidian group-hover:text-gold-matte transition-colors uppercase tracking-tight">{h.vietnamese}</h3>
                <p className="text-xs md:text-sm text-gold-matte/70 font-serif italic line-clamp-2 leading-relaxed h-8 md:h-10">“{h.image}”</p>
                <div className="pt-4 md:pt-6 border-t border-gold-matte/10 border-dashed space-y-4 md:space-y-6 flex-1 flex flex-col justify-between">
                  <p className="text-sm md:text-base text-obsidian/70 line-clamp-4 leading-relaxed font-serif italic group-hover:text-obsidian transition-colors font-light">{h.meaning}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      
      {filtered.length === 0 && (
        <div className="py-32 text-center space-y-6">
          <div className="w-20 h-20 bg-white/40 rounded-full flex items-center justify-center mx-auto text-gold-matte/20 border border-gold-matte/10">
            <Info className="w-8 h-8" />
          </div>
          <p className="text-gold-matte/30 font-serif italic text-xl uppercase tracking-widest">Không tìm thấy quẻ nào phù hợp.</p>
        </div>
      )}
    </div>
  );
};
