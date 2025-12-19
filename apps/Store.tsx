
import React, { useState } from 'react';

const Store: React.FC = () => {
  const [tab, setTab] = useState('Home');

  const apps = [
    { name: 'Adobe Premiere Pro', category: 'Creative', price: 'Free trial', icon: 'fa-clover', color: 'text-purple-400' },
    { name: 'Netflix', category: 'Entertainment', price: 'Free', icon: 'fa-n', color: 'text-red-600' },
    { name: 'Spotify', category: 'Music', price: 'Free', icon: 'fa-spotify', color: 'text-green-500' },
    { name: 'Visual Studio Code', category: 'Developer', price: 'Free', icon: 'fa-code', color: 'text-blue-500' },
    { name: 'Roblox', category: 'Gaming', price: 'Free', icon: 'fa-square', color: 'text-zinc-300' },
    { name: 'WhatsApp', category: 'Social', price: 'Free', icon: 'fa-whatsapp', color: 'text-green-400' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      <div className="h-16 flex items-center px-8 border-b border-white/5 gap-12 shrink-0">
        <span className="text-xl font-black uppercase tracking-tighter text-blue-400">Store</span>
        <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-white/40">
          {['Home', 'Apps', 'Games', 'Movies'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`transition-colors hover:text-white ${tab === t ? 'text-white border-b-2 border-blue-400 pb-1' : ''}`}>{t}</button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <i className="fa-solid fa-magnifying-glass text-white/20 text-xs"></i>
          <input type="text" placeholder="Search apps..." className="bg-transparent border-none outline-none text-xs w-48 text-white font-bold" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <div className="mb-12">
          <div className="h-64 rounded-[32px] bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-12 relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 right-0 p-8 opacity-20"><i className="fa-solid fa-bolt text-[180px]"></i></div>
             <div className="relative z-10">
                <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white/80 border border-white/20">Featured</span>
                <h2 className="text-5xl font-black tracking-tighter text-white mt-4">Creativity Reimagined</h2>
                <p className="text-white/60 mt-4 max-w-lg font-medium">Download the latest Adobe Creative Cloud tools optimized for Evolution Engine 26.</p>
                <button className="mt-8 bg-white text-black px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-transform active:scale-95">Get Started</button>
             </div>
          </div>
        </div>

        <h3 className="text-lg font-black text-white/80 uppercase tracking-widest mb-8">Top Free Apps</h3>
        <div className="grid grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <div key={i} className="bg-white/5 p-6 rounded-[28px] border border-white/5 hover:bg-white/10 transition-all group cursor-pointer">
               <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-black/50 flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform shadow-2xl">
                     <i className={`fa-solid ${app.icon} ${app.color}`}></i>
                  </div>
                  <div className="flex-1">
                     <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{app.name}</div>
                     <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{app.category}</div>
                     <div className="mt-2 flex items-center gap-1">
                        {[1,2,3,4,5].map(s => <i key={s} className="fa-solid fa-star text-[8px] text-yellow-500"></i>)}
                        <span className="text-[8px] text-white/20 ml-1">(12.4k)</span>
                     </div>
                  </div>
               </div>
               <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-black text-white/40">{app.price}</span>
                  <button className="bg-blue-600/20 text-blue-400 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-400/20 hover:bg-blue-600 hover:text-white transition-all">Install</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
