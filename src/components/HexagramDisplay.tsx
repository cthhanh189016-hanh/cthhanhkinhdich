import React from 'react';
import { cn } from '../lib/utils';

interface HexagramDisplayProps {
  binary: string; // 6 bits, bottom to top (index 0 is bottom)
  changingLines?: number[]; // indices starting from 1
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ 
  binary, 
  changingLines = [], 
  className,
  size = 'md' 
}) => {
  const lines = binary.split('');
  
  const widthClass = size === 'sm' ? 'w-16' : size === 'md' ? 'w-32' : 'w-48';
  const heightClass = size === 'sm' ? 'h-1' : size === 'md' ? 'h-2' : 'h-3';
  const gapClass = size === 'sm' ? 'gap-1' : size === 'md' ? 'gap-2' : 'gap-3';

  return (
    <div className={cn("flex flex-col-reverse", gapClass, className)}>
      {lines.map((line, idx) => {
        const lineNum = idx + 1;
        const isChanging = changingLines.includes(lineNum);
        const isYang = line === '1';

        return (
          <div key={idx} className="relative flex items-center justify-center">
            {isYang ? (
              <div 
                className={cn(
                  "bg-gold-matte transition-all duration-700 shadow-[0_0_10px_rgba(197,160,89,0.1)]", 
                  widthClass, 
                  heightClass,
                  isChanging && "bg-cinnabar shadow-[0_0_15px_rgba(126,34,23,0.4)]"
                )} 
              />
            ) : (
              <div className={cn("flex justify-between", widthClass)}>
                <div 
                  className={cn(
                    "bg-gold-matte transition-all duration-700 shadow-[0_0_10px_rgba(197,160,89,0.1)]", 
                    "w-[42%]", 
                    heightClass,
                    isChanging && "bg-cinnabar shadow-[0_0_15px_rgba(126,34,23,0.4)]"
                  )} 
                />
                <div 
                  className={cn(
                    "bg-gold-matte transition-all duration-700 shadow-[0_0_10px_rgba(197,160,89,0.1)]", 
                    "w-[42%]", 
                    heightClass,
                    isChanging && "bg-cinnabar shadow-[0_0_15px_rgba(126,34,23,0.4)]"
                  )} 
                />
              </div>
            )}
            {isChanging && (
              <div className="absolute -right-8 text-cinnabar font-serif text-xl animate-pulse">
                ✻
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
