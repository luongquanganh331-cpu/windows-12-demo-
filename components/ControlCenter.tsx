
import React from 'react';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  isLiquidGlass: boolean;
  onLock: () => void;
  wifiState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  btState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  airplaneState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose, isLiquidGlass, onLock, wifiState, btState, airplaneState }) => {
  if (!isOpen) return null;

  const [wifi, setWifi] = wifiState;
  const [bt, setBt] = btState;
  const [airplane, setAirplane] = airplaneState;

  const toggles = [
    { name: 'WiFi', icon: 'fa-wifi', active: wifi, action: () => setWifi(!wifi) },
    { name: 'Bluetooth', icon: 'fa-bluetooth', active: bt, action: () => setBt(!bt) },
    { name: 'Airplane', icon: 'fa-plane', active: airplane, action: () => setAirplane(!airplane) },
    { name: 'Night light', icon: 'fa-moon', active: true, action: () => {} },
    { name: 'Focus', icon: 'fa-clock', active: false, action: () => {} },
    { name: 'Cast', icon: 'fa-cast', active: false, action: () => {} },
  ];

  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'standard-blur';

  return (
    <div className={`fixed bottom-24 right-8 w-80 rounded-[32px] p-6 border z-[4000] shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-5 duration-200 transition-all ${glassStyle} backdrop-blur-[50px] border-white/20`}>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {toggles.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2">
            <button 
              onClick={t.action}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${t.active ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
            >
              <i className={`fa-solid ${t.icon} text-lg`}></i>
            </button>
            <span className="text-[10px] text-white/60 font-black uppercase tracking-widest text-center">{t.name}</span>
          </div>
        ))}
      </div>

      <div className="space-y-6 px-2">
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-sun text-white/40 text-sm w-4"></i>
          <input type="range" className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none accent-blue-600 cursor-pointer" />
        </div>
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-volume-high text-white/40 text-sm w-4"></i>
          <input type="range" className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none accent-blue-600 cursor-pointer" />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
        <div className="flex items-center gap-2 font-black uppercase tracking-widest">
          <i className="fa-solid fa-battery-full text-green-400 text-sm"></i>
          <span>100% Secure</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={onLock} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors" title="Lock Screen"><i className="fa-solid fa-lock"></i></button>
           <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"><i className="fa-solid fa-gear"></i></button>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
