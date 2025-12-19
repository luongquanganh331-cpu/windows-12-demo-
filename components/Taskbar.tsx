
import React from 'react';
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
  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'standard-blur';

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-[4000] pointer-events-none">
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-[36px] border border-white/30 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.8)] pointer-events-auto transition-all duration-500 ${glassStyle} backdrop-blur-3xl`}>
        {/* Windows 26 Styled Start Button */}
        <button 
          onClick={onStartToggle}
          className="w-12 h-12 flex items-center justify-center hover:bg-white/15 rounded-2xl transition-all active:scale-90 group relative"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform border border-white/30">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-md">
               <path d="M10.5,2V11.5H2V3A1,1,0,0,1,3,2Z" />
               <path d="M22,2V11.5H12.5V2H21A1,1,0,0,1,22,2Z" />
               <path d="M10.5,12.5V22H3a1,1,0,0,1-1-1V12.5Z" />
               <path d="M22,12.5V21a1,1,0,0,1-1,1H12.5V12.5Z" />
            </svg>
          </div>
          {/* Active Dot */}
          <div className="absolute -bottom-2 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
        </button>

        <div className="w-[1px] h-8 bg-white/15 mx-2" />

        {apps.map(app => {
          const isOpen = openWindows.includes(app.id);
          const isActive = activeAppId === app.id;
          
          return (
            <div key={app.id} className="relative group flex flex-col items-center">
              <button
                onClick={() => onLaunch(app.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all active:scale-90 relative ${
                  isActive ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <i className={`fa-solid ${app.icon} ${app.color} text-[22px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:scale-115 transition-all duration-300`}></i>
              </button>
              {isOpen && (
                <div className={`absolute -bottom-2 h-1 rounded-full transition-all duration-500 ${
                  isActive ? 'bg-blue-400 w-6 shadow-[0_0_12px_rgba(59,130,246,1)]' : 'bg-white/30 w-2'
                }`} />
              )}
              {/* Refined Tooltip */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-3xl text-[12px] font-bold px-4 py-2.5 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform translate-y-3 group-hover:translate-y-0 text-white tracking-wide">
                {app.name}
              </div>
            </div>
          );
        })}
        
        <div className="w-[1px] h-8 bg-white/15 mx-2" />
        
        <button 
          onClick={onControlToggle}
          className="w-12 h-12 flex items-center justify-center hover:bg-white/15 rounded-2xl transition-all group active:scale-95"
        >
           <i className="fa-solid fa-chevron-up text-[12px] text-white/50 group-hover:text-white transition-colors transform group-hover:-translate-y-0.5"></i>
        </button>
      </div>
    </div>
  );
};

export default Taskbar;
