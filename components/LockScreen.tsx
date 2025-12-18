
import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
  wallpaper: string;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, wallpaper }) => {
  const [time, setTime] = useState(new Date());
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsFading(true);
    setTimeout(onUnlock, 500);
  };

  return (
    <div 
      onClick={handleUnlock}
      className={`fixed inset-0 z-[9999] bg-cover bg-center flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-in-out ${isFading ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}
      style={{ backgroundImage: `url("${wallpaper}")` }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      
      <div className="relative z-10 flex flex-col items-center p-12 px-20 clock-glass animate-in zoom-in-95 duration-1000">
        <h1 className="text-[120px] font-thin tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none mb-4">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </h1>
        <p className="text-2xl font-light text-white/90 tracking-wide uppercase">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="absolute bottom-16 flex flex-col items-center gap-3 text-white/60 animate-bounce">
        <span className="text-xs font-bold tracking-[0.4em] uppercase">Click or Swipe to login</span>
        <i className="fa-solid fa-chevron-up text-sm"></i>
      </div>

      <div className="absolute bottom-10 right-10 flex gap-6 text-white/40 text-lg">
        <i className="fa-solid fa-wifi"></i>
        <i className="fa-solid fa-battery-full text-green-500/50"></i>
      </div>
    </div>
  );
};

export default LockScreen;