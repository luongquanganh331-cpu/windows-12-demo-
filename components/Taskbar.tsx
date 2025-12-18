
import React, { useState, useEffect } from 'react';
import { AppConfig, AppID } from '../types';

interface TaskbarProps {
  apps: AppConfig[];
  activeAppId: string | null;
  onLaunch: (id: AppID) => void;
  onStartToggle: (e?: React.MouseEvent) => void;
  onWidgetsToggle: (e?: React.MouseEvent) => void;
  onControlToggle: (e?: React.MouseEvent) => void;
  openWindows: AppID[];
  isLiquidGlass: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ apps, activeAppId, onLaunch, onStartToggle, onWidgetsToggle, onControlToggle, openWindows, isLiquidGlass }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'standard-blur';

  return (
    <div className={`fixed bottom-4 left-4 right-4 h-14 ${glassStyle} rounded-2xl flex items-center px-4 z-[2000] border transition-all duration-500`}>
      {/* Left section: Widgets */}
      <div className="w-1/4 flex items-center">
        <button 
          onClick={onWidgetsToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-all active:scale-95 group"
        >
          <i className="fa-solid fa-table-columns text-white/60 group-hover:text-blue-400 transition-colors"></i>
        </button>
      </div>

      {/* Center section: Apps */}
      <div className="flex-1 flex items-center justify-center gap-1">
        <button 
          onClick={onStartToggle}
          className="w-11 h-11 flex items-center justify-center hover:bg-white/20 rounded-xl transition-all active:scale-90 group"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-blue-500 group-hover:scale-110 transition-transform">
             <path d="M10.5,2V11.5H2V3A1,1,0,0,1,3,2Z" />
             <path d="M22,2V11.5H12.5V2H21A1,1,0,0,1,22,2Z" />
             <path d="M10.5,12.5V22H3a1,1,0,0,1-1-1V12.5Z" />
             <path d="M22,12.5V21a1,1,0,0,1-1,1H12.5V12.5Z" />
          </svg>
        </button>

        <div className="w-[1px] h-6 bg-white/10 mx-2" />

        {apps.map(app => {
          const isOpen = openWindows.includes(app.id);
          const isActive = activeAppId === app.id;
          
          return (
            <div key={app.id} className="relative group flex flex-col items-center">
              <button
                onClick={() => onLaunch(app.id)}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all active:scale-90 relative ${
                  isActive ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
                }`}
              >
                <i className={`fa-solid ${app.icon} ${app.color} text-xl drop-shadow-sm`}></i>
              </button>
              {isOpen && (
                <div className={`absolute bottom-1 w-1 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-blue-400 w-4 h-1' : 'bg-white/40 h-1'
                }`} />
              )}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-[10px] px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl transform translate-y-2 group-hover:translate-y-0">
                {app.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right section: System Tray */}
      <div className="w-1/4 flex items-center justify-end gap-1">
         <button 
           onClick={onControlToggle}
           className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-white/10 rounded-xl transition-all group"
         >
           <div className="flex gap-2 text-white/60 text-[10px] transition-colors group-hover:text-white">
             <i className="fa-solid fa-wifi"></i>
             <i className="fa-solid fa-volume-high"></i>
             <i className="fa-solid fa-battery-full text-green-400"></i>
           </div>
         </button>

         <div className="w-[1px] h-6 bg-white/10 mx-1" />

         <button className="flex flex-col items-end leading-tight text-white/90 px-3 py-1 hover:bg-white/10 rounded-xl transition-all">
            <span className="text-[11px] font-bold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-[9px] text-white/50">{time.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
         </button>
      </div>
    </div>
  );
};

export default Taskbar;