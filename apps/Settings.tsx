
import React, { useState } from 'react';
import { OSSettings } from '../types';

interface SettingsProps {
  settings: OSSettings;
  setSettings: (s: Partial<OSSettings>) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState('System');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  const menuItems = [
    { id: 'System', icon: 'fa-laptop', color: 'text-blue-400' },
    { id: 'Bluetooth', icon: 'fa-bluetooth', color: 'text-indigo-400' },
    { id: 'Network', icon: 'fa-wifi', color: 'text-green-400' },
    { id: 'Personalization', icon: 'fa-paintbrush', color: 'text-pink-400' },
    { id: 'Apps', icon: 'fa-border-all', color: 'text-orange-400' },
    { id: 'Accounts', icon: 'fa-user', color: 'text-purple-400' },
    { id: 'Gaming', icon: 'fa-gamepad', color: 'text-red-400' },
    { id: 'Windows Update', icon: 'fa-rotate', color: 'text-blue-500' },
  ];

  const handleUpdate = () => {
    setIsUpdating(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setUpdateProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsUpdating(false);
        setUpdateProgress(0);
      }
    }, 100);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'System':
        return (
          <div className="space-y-8 fade-slide-in">
            <h3 className="text-3xl font-bold">System</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                 <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-3">
                     <i className="fa-solid fa-sun text-xl text-yellow-400"></i>
                     <span className="font-bold">Brightness</span>
                   </div>
                   <span className="text-xs text-white/40">85%</span>
                 </div>
                 <input type="range" defaultValue="85" className="w-full h-1 bg-white/10 rounded-full appearance-none accent-blue-600 cursor-pointer" />
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                 <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-3">
                     <i className="fa-solid fa-volume-high text-xl text-indigo-400"></i>
                     <span className="font-bold">Sound</span>
                   </div>
                   <span className="text-xs text-white/40">70%</span>
                 </div>
                 <input type="range" defaultValue="70" className="w-full h-1 bg-white/10 rounded-full appearance-none accent-blue-600 cursor-pointer" />
              </div>
            </div>
            
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
               <h4 className="font-bold mb-4">Storage (C:)</h4>
               <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '38%' }}></div>
               </div>
               <div className="flex justify-between text-[11px] font-medium text-white/50">
                 <span>382 GB used</span>
                 <span>618 GB free</span>
               </div>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <div className="font-bold">Power Mode</div>
                <div className="text-xs text-white/40">Optimize your PC for performance or battery life</div>
              </div>
              <select className="bg-zinc-800 text-xs px-4 py-2 rounded-lg border border-white/10 outline-none">
                <option>Best Performance</option>
                <option selected>Balanced</option>
                <option>Power Saver</option>
              </select>
            </div>
          </div>
        );
      case 'Bluetooth':
        return (
          <div className="space-y-8 fade-slide-in">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">Bluetooth & Devices</h3>
              <button className="bg-blue-600 px-6 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-blue-500 transition-colors active:scale-95">Add device</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <i className="fa-solid fa-headphones"></i>
                    </div>
                    <div>
                      <span className="text-sm font-semibold block">Evolution Buds Pro</span>
                      <span className="text-[10px] text-green-400">Connected</span>
                    </div>
                 </div>
                 <i className="fa-solid fa-ellipsis-vertical text-white/20"></i>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-500/20 flex items-center justify-center text-zinc-400">
                      <i className="fa-solid fa-keyboard"></i>
                    </div>
                    <div>
                      <span className="text-sm font-semibold block">Magic Keys Elite</span>
                      <span className="text-[10px] text-white/40">Paired</span>
                    </div>
                 </div>
                 <i className="fa-solid fa-ellipsis-vertical text-white/20"></i>
              </div>
            </div>
          </div>
        );
      case 'Personalization':
        return (
          <div className="space-y-8 fade-slide-in">
            <h3 className="text-3xl font-bold">Personalization</h3>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${settings.isLiquidGlass ? 'bg-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.6)]' : 'bg-zinc-700'}`}>
                    <i className="fa-solid fa-droplet text-white"></i>
                  </div>
                  <div>
                    <div className="font-bold">Liquid Glass Engine</div>
                    <div className="text-xs text-white/40 italic">99% Transparency mode (iOS-style crystal UI)</div>
                  </div>
               </div>
               <button 
                 onClick={() => setSettings({ isLiquidGlass: !settings.isLiquidGlass })}
                 className={`w-16 h-8 rounded-full relative transition-all duration-300 ${settings.isLiquidGlass ? 'bg-blue-600' : 'bg-zinc-700'}`}
               >
                 <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${settings.isLiquidGlass ? 'left-9' : 'left-1'}`} />
               </button>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
               <h4 className="font-bold mb-6">Desktop Wallpaper</h4>
               <div className="grid grid-cols-3 gap-4">
                 {[
                   'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
                   'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
                   'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8'
                 ].map(url => (
                   <div 
                     key={url}
                     onClick={() => setSettings({ wallpaper: url })}
                     className={`aspect-video rounded-xl overflow-hidden border-4 transition-all cursor-pointer ${settings.wallpaper.includes(url) ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                   >
                     <img src={url} className="w-full h-full object-cover" alt="wp" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );
      case 'Windows Update':
        return (
          <div className="space-y-8 fade-slide-in">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">Windows Update</h3>
              {!isUpdating && <button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg text-sm font-bold shadow-lg transition-all active:scale-95">Check for updates</button>}
            </div>
            
            {isUpdating ? (
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-3">
                     <i className="fa-solid fa-rotate animate-spin text-blue-400"></i>
                     <span className="text-sm font-medium">Installing System Update...</span>
                   </div>
                   <span className="text-xs text-blue-400 font-bold">{updateProgress}%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-200 shadow-[0_0_10px_rgba(59,130,246,0.8)]" style={{ width: `${updateProgress}%` }}></div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                   <i className="fa-solid fa-circle-check text-3xl"></i>
                 </div>
                 <div>
                    <div className="text-xl font-bold">You're up to date</div>
                    <div className="text-sm text-white/40">Last checked: Just now</div>
                 </div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-white/20">
            <i className="fa-solid fa-hammer text-6xl mb-6 opacity-10"></i>
            <p className="text-lg font-medium tracking-widest uppercase">Under Development</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-[#0c0c0c]/80 backdrop-blur-3xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/5 p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-4 px-3 mb-10 group cursor-pointer">
           <img src="https://picsum.photos/40/40" className="w-11 h-11 rounded-full border border-white/20 group-hover:border-blue-500 transition-all" alt="pfp" />
           <div>
              <div className="text-sm font-bold truncate w-32 group-hover:text-blue-400 transition-colors">{settings.userName}</div>
              <div className="text-[10px] text-white/40">Local Administrator</div>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-medium transition-all ${activeTab === item.id ? 'bg-white/10 text-white shadow-inner scale-[1.02]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <i className={`fa-solid ${item.icon} w-5 ${item.color} text-lg`}></i>
              {item.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
