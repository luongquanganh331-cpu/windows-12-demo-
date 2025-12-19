
import React, { useState, useEffect } from 'react';

interface WindowProps {
  title: string;
  icon: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  zIndex: number;
  onClick: () => void;
  isLiquidGlass: boolean;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  title,
  icon,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  zIndex,
  onClick,
  isLiquidGlass,
  children
}) => {
  const [position, setPosition] = useState({ x: 120 + Math.random() * 80, y: 120 + Math.random() * 80 });
  const [size, setSize] = useState({ width: 960, height: 680 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || (e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    onClick();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const glassStyle = isLiquidGlass ? "liquid-glass" : "standard-blur";

  const style: React.CSSProperties = isMaximized 
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 100px)', zIndex, borderRadius: 0 }
    : { 
        top: position.y, 
        left: position.x, 
        width: size.width, 
        height: size.height, 
        zIndex,
        transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
        borderRadius: '32px'
      };

  return (
    <div
      style={style}
      className={`fixed flex flex-col overflow-hidden window-shadow border-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] ${glassStyle} ${isDragging ? 'opacity-90 scale-[1.01]' : 'opacity-100'} border-white/20`}
      onClick={onClick}
    >
      {/* Title Bar - Minimalist Glass */}
      <div 
        className={`h-14 flex items-center justify-between px-6 cursor-default select-none shrink-0 border-b ${isLiquidGlass ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/10'} backdrop-blur-2xl`}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-4">
          <i className={`${icon} text-[15px] drop-shadow-md`}></i>
          <span className="text-[12px] font-black tracking-[0.1em] text-white/80 uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onMinimize} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all active:scale-90"><i className="fa-solid fa-minus text-[11px] opacity-60"></i></button>
          <button onClick={onMaximize} className="w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all active:scale-90"><i className="fa-regular fa-square text-[11px] opacity-60"></i></button>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-red-500 rounded-xl group transition-all active:scale-90"><i className="fa-solid fa-xmark text-[11px] group-hover:text-white opacity-60 group-hover:opacity-100"></i></button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full relative z-10">
          {children}
        </div>
        {/* Subtle Surface Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.05] pointer-events-none" />
      </div>
    </div>
  );
};

export default Window;
