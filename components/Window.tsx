
import React, { useState, useRef, useEffect } from 'react';

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
  const [position, setPosition] = useState({ x: 100 + Math.random() * 100, y: 100 + Math.random() * 100 });
  const [size, setSize] = useState({ width: 900, height: 650 });
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
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 72px)', zIndex, borderRadius: 0 }
    : { 
        top: position.y, 
        left: position.x, 
        width: size.width, 
        height: size.height, 
        zIndex,
        transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        borderRadius: '16px'
      };

  return (
    <div
      style={style}
      className={`fixed flex flex-col overflow-hidden window-shadow border shadow-2xl ${glassStyle} ${isDragging ? 'opacity-85 scale-[1.005]' : 'opacity-100'}`}
      onClick={onClick}
    >
      <div 
        className={`h-12 flex items-center justify-between px-4 cursor-default select-none shrink-0 border-b ${isLiquidGlass ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/5'}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-3">
          <i className={`${icon} text-sm`}></i>
          <span className="text-xs font-semibold tracking-wide text-white/90">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onMinimize} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"><i className="fa-solid fa-minus text-[10px]"></i></button>
          <button onClick={onMaximize} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"><i className="fa-regular fa-square text-[10px]"></i></button>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:bg-red-500 rounded-lg group transition-colors"><i className="fa-solid fa-xmark text-[10px] group-hover:text-white"></i></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        {isLiquidGlass && <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none" />}
        <div className="h-full relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;