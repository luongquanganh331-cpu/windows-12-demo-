
import React, { useState } from 'react';
import { AppConfig } from '../types';

interface StartMenuProps {
  apps: AppConfig[];
  onLaunch: (id: any) => void;
  isOpen: boolean;
  isLiquidGlass: boolean;
  onPowerAction: (action: 'shutdown' | 'restart' | 'lock') => void;
  userName: string;
}

const StartMenu: React.FC<StartMenuProps> = ({ apps, onLaunch, isOpen, isLiquidGlass, onPowerAction, userName }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'standard-blur';

  const mostUsed = [
    { id: 'ps', name: 'Adobe Photoshop', icon: 'fa-clover', color: 'text-blue-400' },
    { id: 'ae', name: 'Adobe After Effects', icon: 'fa-film', color: 'text-purple-400' },
    { id: 'dn', name: 'Adobe Dimension', icon: 'fa-cube', color: 'text-green-400' },
    { id: 'fg', name: 'Figma', icon: 'fa-figma', color: 'text-orange-500' },
    { id: 'pp', name: 'Powerpoint', icon: 'fa-file-powerpoint', color: 'text-orange-700' },
  ];

  const pinnedApps = [
    { name: 'Edge', icon: 'fa-edge', color: 'text-blue-400' },
    { name: 'Store', icon: 'fa-bag-shopping', color: 'text-blue-500' },
    { name: 'Office', icon: 'fa-box', color: 'text-orange-600' },
    { name: 'Calendar', icon: 'fa-calendar-days', color: 'text-blue-300' },
    { name: 'Store', icon: 'fa-store', color: 'text-blue-400' },
    { name: 'Accessories', icon: 'fa-toolbox', color: 'text-zinc-400' },
    { name: 'Photos', icon: 'fa-image', color: 'text-indigo-400' },
    { name: 'Media Player', icon: 'fa-circle-play', color: 'text-orange-500' },
    { name: 'Notepad', icon: 'fa-note-sticky', color: 'text-blue-300' },
    { name: 'Clock', icon: 'fa-clock', color: 'text-zinc-300' },
    { name: 'Paint', icon: 'fa-palette', color: 'text-pink-400' },
    { name: 'File Explorer', icon: 'fa-folder-closed', color: 'text-yellow-500' },
  ];

  const recentItems = [
    { name: 'Presentation.pptx', folder: 'Documents', time: '16h', icon: 'fa-file-powerpoint', iconColor: 'text-orange-600' },
    { name: 'Just a text.pptx', folder: 'Documents', time: '21h', icon: 'fa-file-lines', iconColor: 'text-blue-400' },
  ];

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 w-[740px] h-[620px] rounded-[40px] overflow-hidden window-shadow border z-[3000] animate-scale transition-all duration-300 flex ${glassStyle}`}>
      
      {/* Left Pane: Search and Alphabetical List */}
      <div className="w-[45%] bg-white/10 p-8 flex flex-col border-r border-white/5">
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-2.5 border border-white/10 mb-8">
          <i className="fa-solid fa-magnifying-glass text-white/30 text-xs"></i>
          <input 
            type="text" 
            placeholder="Type here to search" 
            className="bg-transparent border-none outline-none text-xs w-full placeholder:text-white/20 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-white mb-4">Most used</h3>
            <div className="space-y-1">
              {mostUsed.map(app => (
                <div key={app.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-xs">
                     <i className={`fa-solid ${app.icon} ${app.color}`}></i>
                  </div>
                  <span className="text-xs font-medium text-white/80 group-hover:text-white">{app.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xs font-bold text-white/40 mb-3 px-2">A</h3>
            <div className="space-y-1">
               {['Access', 'Adobe', 'Adobe Creative Cloud', 'Adobe Animate'].map(a => (
                 <div key={a} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer text-xs font-medium text-white/70 hover:text-white transition-all">
                   <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-xs">
                     <i className={`fa-solid ${a === 'Access' ? 'fa-database text-red-500' : 'fa-a text-red-600'}`}></i>
                   </div>
                   {a}
                 </div>
               ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white/40 mb-3 px-2">B</h3>
            <div className="space-y-1 opacity-50">
               <div className="px-2 py-1 text-xs text-white/40">No apps starting with B</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Pinned Apps and Recent Items */}
      <div className="flex-1 p-8 flex flex-col bg-black/5">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
                <i className="fa-solid fa-bolt"></i>
             </div>
             <div>
                <div className="text-sm font-bold leading-none">Good Afternoon, {userName}!</div>
                <div className="text-[10px] text-white/40 mt-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-sun text-yellow-500"></i> 29°C Denpasar
                </div>
             </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="text-xs font-bold text-white mb-6">Pinned Apps</h3>
          <div className="grid grid-cols-4 gap-y-8 mb-10">
            {pinnedApps.map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                 <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl transition-all group-hover:scale-110 group-hover:bg-white/10 group-active:scale-95`}>
                    <i className={`fa-solid ${app.icon} ${app.color}`}></i>
                 </div>
                 <span className="text-[10px] text-white/60 font-medium text-center">{app.name}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xs font-bold text-white mb-5">Recent Items</h3>
          <div className="space-y-3">
            {recentItems.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                   <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg ${file.iconColor}`}>
                      <i className={`fa-solid ${file.icon}`}></i>
                   </div>
                   <div>
                      <div className="text-xs font-medium text-white/80 group-hover:text-white">{file.name}</div>
                      <div className="text-[9px] text-white/40 uppercase tracking-tighter">{file.folder}</div>
                   </div>
                </div>
                <span className="text-[10px] text-white/30 pr-2">{file.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Power Button */}
        <div className="mt-6 flex justify-end">
           <button 
             onClick={() => onPowerAction('shutdown')} 
             className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
             title="Power"
           >
              <i className="fa-solid fa-power-off"></i>
           </button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
