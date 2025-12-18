
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
    setTimeout(onUnlock, 600);
  };

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div 
      onClick={handleUnlock}
      className={`fixed inset-0 z-[9999] bg-cover bg-center flex flex-col items-center transition-all duration-700 ease-in-out cursor-pointer ${isFading ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}
      style={{ backgroundImage: `url("${wallpaper}")` }}
    >
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Top Status Icons */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-6 text-white/60 text-sm">
        <i className="fa-solid fa-keyboard"></i>
        <i className="fa-solid fa-volume-high"></i>
        <i className="fa-solid fa-wifi"></i>
      </div>

      {/* Main Clock Container */}
      <div className="mt-36 flex flex-col items-center animate-scale">
        {/* Vertical Stacked Clock */}
        <div className="p-12 px-20 liquid-glass rounded-[64px] border border-white/20 flex flex-col items-center shadow-2xl relative">
          <div className="flex flex-col items-center leading-[0.85]">
            <span className="text-[160px] font-medium tracking-tight opacity-90">{hours}</span>
            <span className="text-[160px] font-medium tracking-tight opacity-90">{minutes}</span>
          </div>
          
          <div className="h-[1px] w-full bg-white/10 my-10" />
          
          <div className="text-center">
            <p className="text-2xl font-light text-white/70 mb-6">
              {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            
            <div className="flex items-center justify-center gap-3 bg-white/5 rounded-full px-8 py-3 border border-white/10 hover:bg-white/10 transition-colors">
              <i className="fa-solid fa-cloud-sun text-yellow-400 text-xl"></i>
              <span className="text-base font-medium">26°C Partly Cloudy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copilot Logo Branding */}
      <div className="absolute bottom-12 right-12">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
           <i className="fa-solid fa-bolt text-white text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
