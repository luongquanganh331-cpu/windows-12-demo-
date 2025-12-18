
import React, { useState, useMemo } from 'react';
import { AppConfig } from '../types';

interface StartMenuProps {
  apps: AppConfig[];
  onLaunch: (id: any) => void;
  isOpen: boolean;
  isLiquidGlass: boolean;
  onPowerAction: (action: 'shutdown' | 'restart' | 'lock') => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ apps, onLaunch, isOpen, isLiquidGlass, onPowerAction }) => {
  const [search, setSearch] = useState('');
  const [showPower, setShowPower] = useState(false);

  const filteredApps = useMemo(() => {
    if (!search) return apps;
    return apps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()));
  }, [apps, search]);

  if (!isOpen) return null;

  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'standard-blur';

  return (
    <div className={`fixed bottom-16 left-1/2 -translate-x-1/2 w-[580px] h-[640px] rounded-3xl p-8 window-shadow border z-[1000] animate-in slide-in-from-bottom-10 duration-300 transition-all ${glassStyle}`}>
      <div className="flex flex-col h-full">
        <div className="relative mb-8">
          <input 
            type="text" 
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for apps, settings, and files" 
            className="w-full bg-white/10 border border-white/10 rounded-full px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-4 text-white/40 text-xs"></i>
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-5 top-4 text-white/40 hover:text-white">
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {filteredApps.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">Pinned</h3>
                <button className="text-[10px] bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full text-white/80 transition-colors">All Apps</button>
              </div>

              <div className="grid grid-cols-6 gap-y-8 gap-x-4 mb-12">
                {filteredApps.map(app => (
                  <div 
                    key={app.id}
                    onClick={() => onLaunch(app.id)}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className={`w-14 h-14 ${app.color} bg-white/5 rounded-2xl flex items-center justify-center text-3xl transition-all group-hover:scale-110 group-hover:bg-white/10 group-active:scale-95 shadow-sm`}>
                      <i className={`fa-solid ${app.icon}`}></i>
                    </div>
                    <span className="text-[11px] text-white/80 group-hover:text-white font-medium text-center">{app.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-white/40">
              <i className="fa-solid fa-face-frown text-3xl mb-4 opacity-20"></i>
              <p className="text-sm">No results found for "{search}"</p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl cursor-pointer transition-colors">
            <img src="https://picsum.photos/40/40" className="w-9 h-9 rounded-full border border-white/10" alt="User" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white/90">LTT Dev</span>
              <span className="text-[10px] text-white/40">Administrator</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white">
              <i className="fa-solid fa-user-gear"></i>
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowPower(!showPower)}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white"
              >
                <i className="fa-solid fa-power-off text-red-400"></i>
              </button>
              
              {showPower && (
                <div className={`absolute bottom-full right-0 mb-2 w-48 rounded-xl p-2 shadow-2xl border ${isLiquidGlass ? 'liquid-glass' : 'standard-blur'} animate-in fade-in slide-in-from-bottom-2`}>
                  <button onClick={() => onPowerAction('lock')} className="w-full flex items-center gap-3 px-4 py-2 text-xs hover:bg-white/10 rounded-lg text-white/80 hover:text-white">
                    <i className="fa-solid fa-lock w-4"></i> Lock
                  </button>
                  <button onClick={() => onPowerAction('restart')} className="w-full flex items-center gap-3 px-4 py-2 text-xs hover:bg-white/10 rounded-lg text-white/80 hover:text-white">
                    <i className="fa-solid fa-rotate w-4"></i> Restart
                  </button>
                  <button onClick={() => onPowerAction('shutdown')} className="w-full flex items-center gap-3 px-4 py-2 text-xs hover:bg-red-500 rounded-lg text-white/80 hover:text-white transition-colors">
                    <i className="fa-solid fa-power-off w-4"></i> Shut down
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;