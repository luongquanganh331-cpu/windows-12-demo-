
import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  isLiquidGlass: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onPersonalize: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, isLiquidGlass, onClose, onRefresh, onPersonalize }) => {
  return (
    <div 
      className={`fixed rounded-xl py-1.5 border z-[5000] shadow-2xl w-56 animate-in fade-in zoom-in-95 duration-150 ${isLiquidGlass ? 'liquid-glass' : 'bg-[#1c1c1c] border-white/10'}`}
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onRefresh} className="w-full flex items-center justify-between px-4 py-1.5 text-xs hover:bg-white/10 transition-colors">
        <span>View</span>
        <i className="fa-solid fa-chevron-right text-[8px] opacity-40"></i>
      </button>
      <button onClick={onRefresh} className="w-full flex items-center justify-between px-4 py-1.5 text-xs hover:bg-white/10 transition-colors">
        <span>Sort by</span>
        <i className="fa-solid fa-chevron-right text-[8px] opacity-40"></i>
      </button>
      <button onClick={onRefresh} className="w-full flex items-center gap-3 px-4 py-1.5 text-xs hover:bg-white/10 transition-colors">
        <i className="fa-solid fa-rotate-right opacity-40"></i>
        <span>Refresh</span>
      </button>
      <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
      <button onClick={onRefresh} className="w-full flex items-center gap-3 px-4 py-1.5 text-xs hover:bg-white/10 transition-colors">
        <i className="fa-solid fa-plus opacity-40"></i>
        <span>New</span>
      </button>
      <div className="h-[1px] bg-white/5 my-1 mx-2"></div>
      <button onClick={onRefresh} className="w-full flex items-center gap-3 px-4 py-1.5 text-xs hover:bg-white/10 transition-colors">
        <i className="fa-solid fa-display opacity-40"></i>
        <span>Display settings</span>
      </button>
      <button onClick={onPersonalize} className="w-full flex items-center gap-3 px-4 py-1.5 text-xs hover:bg-white/10 transition-colors">
        <i className="fa-solid fa-paintbrush opacity-40"></i>
        <span>Personalize</span>
      </button>
    </div>
  );
};

export default ContextMenu;
