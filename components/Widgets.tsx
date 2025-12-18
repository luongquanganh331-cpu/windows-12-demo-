
import React from 'react';

interface WidgetsProps {
  isOpen: boolean;
  // Added missing property to match App.tsx usage
  isLiquidGlass: boolean;
}

const Widgets: React.FC<WidgetsProps> = ({ isOpen, isLiquidGlass }) => {
  if (!isOpen) return null;

  // Apply glass style based on setting
  const glassStyle = isLiquidGlass ? 'liquid-glass' : 'mica-dark';

  return (
    <div className={`fixed top-4 left-4 bottom-20 w-[400px] rounded-3xl p-6 border border-white/10 z-[1000] shadow-2xl animate-in slide-in-from-left-10 duration-300 ${glassStyle}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/32/32" className="w-8 h-8 rounded-full" alt="user" />
          <span className="text-sm font-semibold">Good Morning, Dev</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center">
          <i className="fa-solid fa-plus text-xs"></i>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-[10px] text-white/40 uppercase font-bold mb-2">Weather</div>
          <div className="text-2xl font-bold">24°C</div>
          <div className="text-xs text-white/60">Mostly Sunny</div>
          <i className="fa-solid fa-sun text-yellow-400 text-3xl mt-4"></i>
        </div>

        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-[10px] text-white/40 uppercase font-bold mb-2">Stocks</div>
          <div className="text-sm font-bold">MSFT <span className="text-green-400">+2.4%</span></div>
          <div className="text-xs text-white/60">$425.22</div>
          <div className="mt-4 h-8 flex items-end gap-1">
             {[30, 45, 35, 60, 55, 75].map((h, i) => (
               <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-green-400/40 rounded-t-sm"></div>
             ))}
          </div>
        </div>

        <div className="col-span-2 p-4 bg-white/5 rounded-2xl border border-white/5">
           <div className="text-[10px] text-white/40 uppercase font-bold mb-3">Top News</div>
           <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://picsum.photos/id/1/100/100")' }}></div>
              <div>
                 <div className="text-xs font-medium leading-snug">Windows 12 Evolution Preview: The Future of Computing is AI-Native.</div>
                 <div className="text-[10px] text-white/40 mt-1">Tech Radar • 5m ago</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
