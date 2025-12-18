
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
      <div className={`flex items-center gap-1 px-4 py-2 rounded-[28px] border border-white/20 shadow-2xl pointer-events-auto transition-all duration-500 ${glassStyle}`}>
        {/* Centered Start Button */}
        <button 
          onClick={onStartToggle}
          className="w-11 h-11 flex items-center justify-center hover:bg-white/20 rounded-2xl transition-all active:scale-90 group relative"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
               <path d="M10.5,2V11.5H2V3A1,1,0,0,1,3,2Z" />
               <path d="M22,2V11.5H12.5V2H21A1,1,0,0,1,22,2Z" />
               <path d="M10.5,12.5V22H3a1,1,0,0,1-1-1V12.5Z" />
               <path d="M22,12.5V21a1,1,0,0,1-1,1H12.5V12.5Z" />
            </svg>
          </div>
          <div className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        <div className="w-[1px] h-6 bg-white/10 mx-1.5" />

        {apps.map(app => {
          const isOpen = openWindows.includes(app.id);
          const isActive = activeAppId === app.id;
          
          return (
            <div key={app.id} className="relative group flex flex-col items-center">
              <button
                onClick={() => onLaunch(app.id)}
                className={`w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-90 relative ${
                  isActive ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
                }`}
              >
                <i className={`fa-solid ${app.icon} ${app.color} text-xl drop-shadow-sm group-hover:scale-110 transition-transform`}></i>
              </button>
              {isOpen && (
                <div className={`absolute -bottom-1 h-1 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-blue-400 w-4' : 'bg-white/40 w-1'
                }`} />
              )}
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl text-[10px] px-3 py-1.5 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl transform translate-y-2 group-hover:translate-y-0">
                {app.name}
              </div>
            </div>
          );
        })}
        
        <div className="w-[1px] h-6 bg-white/10 mx-1.5" />
        
        {/* Floating Tray Access */}
        <button 
          onClick={onControlToggle}
          className="w-11 h-11 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-all group"
        >
           <i className="fa-solid fa-chevron-up text-[10px] text-white/40 group-hover:text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default Taskbar;
