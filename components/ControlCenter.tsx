
import React from 'react';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  isLiquidGlass: boolean;
  onLock: () => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose, isLiquidGlass, onLock }) => {
  if (!isOpen) return null;

  const toggles = [
    { name: 'WiFi', icon: 'fa-wifi', active: true },
    { name: 'Bluetooth', icon: 'fa-bluetooth', active: true },
    { name: 'Airplane', icon: 'fa-plane', active: false },
    { name: 'Night light', icon: 'fa-moon', active: true },
    { name: 'Focus', icon: 'fa-clock', active: false },
    { name: 'Cast', icon: 'fa-cast', active: false },
  ];

  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'standard-blur';

  return (
    <div className={`fixed bottom-16 right-4 w-80 rounded-2xl p-5 border z-[2000] shadow-2xl animate-in slide-in-from-bottom-5 duration-200 transition-all ${glassStyle}`}>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {toggles.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2">
            <button className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${t.active ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
              <i className={`fa-solid ${t.icon}`}></i>
            </button>
            <span className="text-[10px] text-white/60 font-medium text-center">{t.name}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-sun text-white/40 text-xs w-4"></i>
          <input type="range" className="flex-1 h-1 bg-white/10 rounded-full appearance-none accent-blue-600 cursor-pointer" />
        </div>
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-volume-high text-white/40 text-xs w-4"></i>
          <input type="range" className="flex-1 h-1 bg-white/10 rounded-full appearance-none accent-blue-600 cursor-pointer" />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/60">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-battery-full text-green-400"></i>
          <span>100% (Plugged in)</span>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={onLock} className="hover:text-white transition-colors" title="Lock Screen"><i className="fa-solid fa-lock"></i></button>
           <button className="hover:text-white transition-colors"><i className="fa-solid fa-gear"></i></button>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;