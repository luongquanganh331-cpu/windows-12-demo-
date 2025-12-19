
import React, { useState, useMemo } from 'react';
import { AppConfig, AppID } from '../types';

interface StartMenuProps {
  apps: AppConfig[];
  onLaunch: (id: AppID) => void;
  isOpen: boolean;
  isLiquidGlass: boolean;
  onPowerAction: (action: 'shutdown' | 'restart' | 'lock') => void;
  userName: string;
}

const StartMenu: React.FC<StartMenuProps> = ({ apps, onLaunch, isOpen, isLiquidGlass, onPowerAction, userName }) => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'dashboard' | 'all-apps'>('dashboard');

  // Group apps by first letter for "All Apps" view - Hook must be called before early return
  const groupedApps = useMemo(() => {
    const filtered = apps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()));
    const groups: Record<string, AppConfig[]> = {};
    filtered.sort((a, b) => a.name.localeCompare(b.name)).forEach(app => {
      const letter = app.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(app);
    });
    return groups;
  }, [apps, search]);

  if (!isOpen) return null;

  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'standard-blur';

  const mostUsed = [
    { id: 'browser', name: 'Edge Pro', icon: 'fa-edge', color: 'text-blue-400' },
    { id: 'copilot', name: 'Copilot', icon: 'fa-microchip', color: 'text-blue-500' },
    { id: 'explorer', name: 'Explorer', icon: 'fa-folder-closed', color: 'text-yellow-500' },
    { id: 'settings', name: 'Settings', icon: 'fa-gear', color: 'text-zinc-400' },
  ];

  const pinnedApps = [
    { id: 'explorer', name: 'Explorer', icon: 'fa-folder-closed', color: 'text-yellow-500' },
    { id: 'browser', name: 'Edge Pro', icon: 'fa-edge', color: 'text-blue-400' },
    { id: 'copilot', name: 'Copilot', icon: 'fa-microchip', color: 'text-blue-500' },
    { id: 'settings', name: 'Settings', icon: 'fa-gear', color: 'text-zinc-400' },
    { id: 'weather', name: 'Weather', icon: 'fa-cloud-sun', color: 'text-blue-300' },
    { id: 'notepad', name: 'Notepad', icon: 'fa-note-sticky', color: 'text-zinc-300' },
    { id: 'calculator', name: 'Calculator', icon: 'fa-calculator', color: 'text-green-500' },
  ];

  const recentItems = [
    { name: 'System_Architecture_2026.pdf', folder: 'Cloud Drive', time: 'Just now', icon: 'fa-file-pdf', iconColor: 'text-red-500' },
    { name: 'Concept_Visuals.fig', folder: 'Design', time: '14m', icon: 'fa-figma', iconColor: 'text-purple-500' },
    { name: 'Quarterly_Review.xlsx', folder: 'Business', time: '1h', icon: 'fa-file-excel', iconColor: 'text-green-600' },
  ];

  return (
    <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 w-[800px] h-[680px] rounded-[56px] overflow-hidden window-shadow border z-[3000] animate-scale transition-all duration-500 flex ${glassStyle} backdrop-blur-[60px] border-white/25 shadow-[0_40px_100px_rgba(0,0,0,0.6)]`}>
      
      {/* Side Pane: Left Navigation & Quick Actions */}
      <div className="w-[40%] bg-white/[0.04] p-10 flex flex-col border-r border-white/10 shadow-2xl">
        <div className="flex items-center gap-4 bg-white/10 rounded-2xl px-6 py-4 border border-white/20 mb-10 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all shadow-inner group">
          <i className="fa-solid fa-magnifying-glass text-white/30 text-sm group-focus-within:text-white transition-colors"></i>
          <input 
            type="text" 
            placeholder="Search evolution..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white/20 text-white font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          <div className="mb-12">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-8">Quick Start</h3>
            <div className="space-y-2">
              {mostUsed.map(app => (
                <div key={app.name} onClick={() => onLaunch(app.id as AppID)} className="flex items-center gap-5 p-3 rounded-2xl hover:bg-white/10 cursor-pointer transition-all group active:scale-95">
                  <div className="w-10 h-10 rounded-xl bg-black/50 flex items-center justify-center text-lg border border-white/10 group-hover:scale-105 transition-transform shadow-xl">
                     <i className={`fa-solid ${app.icon} ${app.color}`}></i>
                  </div>
                  <span className="text-[13px] font-black text-white/60 group-hover:text-white transition-colors">{app.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-8">System Folders</h3>
            <div className="grid grid-cols-1 gap-2">
               {[
                 { name: 'Cloud Drive', icon: 'fa-cloud', color: 'text-blue-400' },
                 { name: 'Local Disk', icon: 'fa-hard-drive', color: 'text-zinc-400' },
                 { name: 'Vault', icon: 'fa-vault', color: 'text-yellow-500' }
               ].map(item => (
                 <div key={item.name} onClick={() => onLaunch('explorer')} className="flex items-center gap-5 p-3 rounded-2xl hover:bg-white/10 cursor-pointer text-[13px] font-black text-white/50 hover:text-white transition-all group">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-base border border-white/10 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                      <i className={`fa-solid ${item.icon} ${item.color}`}></i>
                   </div>
                   {item.name}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Pane: Dynamic Content */}
      <div className="flex-1 p-12 flex flex-col bg-black/15 transition-all duration-300">
        
        {view === 'dashboard' ? (
          <>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-5">
                <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 flex items-center justify-center text-4xl shadow-[0_12px_40px_rgba(59,130,246,0.5)] border border-white/30 transition-transform hover:rotate-3 hover:scale-110 group cursor-pointer">
                  <i className="fa-solid fa-bolt text-white group-hover:animate-pulse"></i>
                </div>
                <div>
                  <div className="text-[24px] font-black leading-none tracking-tighter text-white/95 uppercase">Good Afternoon</div>
                  <div className="text-[11px] text-white/30 mt-2.5 flex items-center gap-2 font-black uppercase tracking-[0.2em]">
                    <i className="fa-solid fa-circle text-[8px] text-green-500 animate-pulse"></i>
                    Evolution OS v26.4
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em]">Pinned Apps</h3>
                <button 
                  onClick={() => setView('all-apps')}
                  className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors font-black uppercase tracking-widest bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20"
                >
                  All Apps <i className="fa-solid fa-chevron-right ml-1"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-y-12 mb-14 px-2">
                {pinnedApps.map((app, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer" onClick={() => onLaunch(app.id as AppID)}>
                    <div className={`w-15 h-15 rounded-[22px] bg-white/5 flex items-center justify-center text-3xl transition-all group-hover:scale-115 group-hover:bg-white/15 group-active:scale-90 shadow-2xl border border-white/10 group-hover:border-white/30`}>
                        <i className={`fa-solid ${app.icon} ${app.color} drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)]`}></i>
                    </div>
                    <span className="text-[10px] text-white/40 font-black tracking-tight text-center group-hover:text-white transition-colors truncate w-full px-1 uppercase">{app.name}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-[11px] font-black text-white/60 uppercase tracking-[0.3em] mb-8 px-2">Recent Stream</h3>
              <div className="space-y-5 px-2">
                {recentItems.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-[32px] bg-white/[0.04] border border-white/10 hover:bg-white/10 transition-all cursor-pointer group shadow-lg hover:shadow-2xl">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl bg-black/60 flex items-center justify-center text-2xl ${file.iconColor} border border-white/10 group-hover:scale-110 transition-transform shadow-inner`}>
                          <i className={`fa-solid ${file.icon}`}></i>
                      </div>
                      <div>
                          <div className="text-[14px] font-black text-white/90 group-hover:text-white leading-tight">{file.name}</div>
                          <div className="text-[10px] text-white/30 uppercase tracking-[0.15em] mt-1.5 font-black">{file.folder}</div>
                      </div>
                    </div>
                    <span className="text-[11px] text-white/20 pr-4 font-black uppercase tracking-widest">{file.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full animate-fade">
             <div className="flex items-center gap-4 mb-8">
               <button 
                 onClick={() => setView('dashboard')}
                 className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all border border-white/10"
               >
                 <i className="fa-solid fa-chevron-left"></i>
               </button>
               <h3 className="text-xl font-black text-white uppercase tracking-wider">All Applications</h3>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-10">
               {Object.keys(groupedApps).sort().map(letter => (
                 <div key={letter} className="space-y-4">
                   <div className="px-4 py-1 text-blue-400 font-black text-lg border-b border-white/5 mb-4">{letter}</div>
                   <div className="grid grid-cols-1 gap-1">
                     {groupedApps[letter].map(app => (
                       <div 
                         key={app.id} 
                         onClick={() => onLaunch(app.id)}
                         className="flex items-center gap-5 p-4 rounded-3xl hover:bg-white/10 cursor-pointer group transition-all"
                       >
                         <div className="w-11 h-11 rounded-2xl bg-black/40 flex items-center justify-center text-xl border border-white/10 group-hover:scale-105 transition-transform shadow-lg">
                            <i className={`fa-solid ${app.icon} ${app.color}`}></i>
                         </div>
                         <div className="flex flex-col">
                           <span className="text-[15px] font-bold text-white/80 group-hover:text-white transition-colors">{app.name}</span>
                           <span className="text-[9px] text-white/20 uppercase tracking-widest font-black">System Application</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
               {Object.keys(groupedApps).length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full opacity-20">
                    <i className="fa-solid fa-ghost text-6xl mb-4"></i>
                    <p className="text-sm font-black uppercase tracking-widest">No applications found</p>
                 </div>
               )}
             </div>
          </div>
        )}

        {/* Start Menu Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-8">
           <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} className="w-8 h-8 rounded-full border border-white/20 group-hover:border-blue-400 transition-colors" alt="pfp" />
             <span className="text-[12px] font-black text-white/60 group-hover:text-white uppercase tracking-widest">{userName}</span>
           </div>
           
           <div className="flex gap-4">
              <button 
                onClick={() => onPowerAction('lock')} 
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/30 hover:text-blue-400 transition-all active:scale-90 border border-white/10"
                title="Secure Lock"
              >
                 <i className="fa-solid fa-lock text-lg"></i>
              </button>
              <button 
                onClick={() => onPowerAction('shutdown')} 
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/30 hover:text-red-500 transition-all active:scale-90 border border-white/10 shadow-2xl"
                title="System Termination"
              >
                 <i className="fa-solid fa-power-off text-lg"></i>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
