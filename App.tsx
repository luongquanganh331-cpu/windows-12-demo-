
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import Window from './components/Window';
import Explorer from './apps/Explorer';
import Browser from './apps/Browser';
import Copilot from './apps/Copilot';
import WeatherApp from './apps/Weather';
import Calculator from './apps/Calculator';
import Notepad from './apps/Notepad';
import Settings from './apps/Settings';
import StoreApp from './apps/Store';
import LockScreen from './components/LockScreen';
import LoginScreen from './components/LoginScreen';
import ControlCenter from './components/ControlCenter';
import Widgets from './components/Widgets';
import ContextMenu from './components/ContextMenu';
import { AppID, WindowState, AppConfig, OSSettings } from './types';

// Static Camera Component to ensure stable identity
const CameraApp = () => (
  <div className="h-full flex items-center justify-center bg-black">
    <i className="fa-solid fa-camera text-6xl text-white/10 animate-pulse"></i>
  </div>
);

// Define APPS outside the component to ensure component references are strictly stable
const APPS_CONFIG: AppConfig[] = [
  { id: 'copilot', name: 'Copilot', icon: 'fa-microchip', color: 'text-blue-400', Component: Copilot },
  { id: 'explorer', name: 'File Explorer', icon: 'fa-folder', color: 'text-yellow-400', Component: Explorer },
  { id: 'browser', name: 'Browser', icon: 'fa-earth-americas', color: 'text-blue-500', Component: Browser },
  { id: 'weather', name: 'Weather', icon: 'fa-cloud-sun', color: 'text-orange-400', Component: WeatherApp },
  { id: 'notepad', name: 'Notepad', icon: 'fa-note-sticky', color: 'text-zinc-400', Component: Notepad },
  { id: 'calculator', name: 'Calculator', icon: 'fa-calculator', color: 'text-green-500', Component: Calculator },
  { id: 'store', name: 'Store', icon: 'fa-bag-shopping', color: 'text-blue-400', Component: StoreApp },
  { id: 'settings', name: 'Settings', icon: 'fa-gear', color: 'text-zinc-400', Component: Settings },
  { id: 'camera', name: 'Camera', icon: 'fa-camera', color: 'text-zinc-300', Component: CameraApp },
];

const App: React.FC = () => {
  // 1. All hooks at the absolute top level
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [osState, setOsState] = useState<'booting' | 'locked' | 'login' | 'desktop' | 'power-off' | 'restarting'>('booting');
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [activeAppId, setActiveAppId] = useState<AppID | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  const [time, setTime] = useState(new Date());

  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);

  const [osSettings, setOsSettings] = useState<OSSettings>({
    wallpaper: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=2574',
    isLiquidGlass: true,
    currentWifi: 'Evolution_Net_6G',
    userName: 'Abdi',
    userEmail: 'abdi@evolution.os',
    isDarkMode: true
  });

  useEffect(() => {
    const clock = setInterval(() => setTime(new Date()), 1000);
    if (osState === 'booting' || osState === 'restarting') {
      const timer = setTimeout(() => setOsState('locked'), 4500);
      return () => { clearTimeout(timer); clearInterval(clock); };
    }
    return () => clearInterval(clock);
  }, [osState]);

  const closeAllFlyouts = useCallback(() => {
    setIsStartOpen(false);
    setIsWidgetsOpen(false);
    setIsControlOpen(false);
    setContextMenu(null);
  }, []);

  const updateSettings = useCallback((partial: Partial<OSSettings>) => {
    setOsSettings(prev => ({ ...prev, ...partial }));
  }, []);

  const launchApp = useCallback((id: AppID) => {
    closeAllFlyouts();
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w);
      }
      const appConfig = APPS_CONFIG.find(a => a.id === id);
      if (!appConfig) return prev;
      return [...prev, {
        id, title: appConfig.name, isOpen: true, isMinimized: false, isMaximized: false, zIndex: zIndexCounter + 1
      }];
    });
    setZIndexCounter(prev => prev + 1);
    setActiveAppId(id);
  }, [zIndexCounter, closeAllFlyouts]);

  const closeWindow = useCallback((id: AppID) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setActiveAppId(prev => prev === id ? null : prev);
  }, []);

  const focusWindow = useCallback((id: AppID) => {
    setZIndexCounter(prev => {
      const newZ = prev + 1;
      setWindows(current => current.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
      return newZ;
    });
    setActiveAppId(id);
    closeAllFlyouts();
  }, [closeAllFlyouts]);

  const handlePowerAction = useCallback((action: 'shutdown' | 'restart' | 'lock') => {
    closeAllFlyouts();
    if (action === 'shutdown') {
      setOsState('power-off');
      setWindows([]);
    } else if (action === 'restart') {
      setOsState('restarting');
      setWindows([]);
    } else if (action === 'lock') {
      setOsState('locked');
    }
  }, [closeAllFlyouts]);

  const handlePowerOn = useCallback(() => {
    setOsState('booting');
  }, []);

  // 2. Conditional returns after ALL hooks
  if (osState === 'power-off') {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center animate-fade cursor-pointer group" onClick={handlePowerOn}>
        <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center transition-all group-hover:bg-white/5 group-hover:scale-110 group-hover:border-white/20 active:scale-95">
           <i className="fa-solid fa-power-off text-white/10 group-hover:text-blue-500 transition-colors text-3xl"></i>
        </div>
        <div className="mt-8 text-white/5 text-[11px] tracking-[1.5em] uppercase font-black transition-opacity group-hover:opacity-40">Evolution 26 - Click to Power On</div>
      </div>
    );
  }

  if (osState === 'booting' || osState === 'restarting') {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center animate-fade">
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-blue-500 blur-[120px] opacity-40 animate-pulse"></div>
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 flex items-center justify-center relative z-10 shadow-[0_0_80px_rgba(59,130,246,0.6)] border border-white/20">
             <i className="fa-solid fa-bolt text-white text-5xl"></i>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="text-[13px] text-white/40 uppercase tracking-[2.5em] font-black animate-pulse ml-[2.5em]">Windows 26</div>
          <div className="w-40 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_blue] animate-[loading_2.5s_infinite]"></div>
          </div>
        </div>
        <style>{`@keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
      </div>
    );
  }

  return (
    <div 
      className="w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-1000 ease-in-out relative"
      style={{ backgroundImage: `url("${osSettings.wallpaper}")` }}
      onClick={closeAllFlyouts}
      onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
    >
      {osState === 'locked' && <LockScreen wallpaper={osSettings.wallpaper} onUnlock={() => setOsState('login')} />}
      {osState === 'login' && <LoginScreen wallpaper={osSettings.wallpaper} userName={osSettings.userName} onLogin={() => setOsState('desktop')} />}

      {osState === 'desktop' && (
        <div className="relative w-full h-full p-8 animate-fade">
          {/* Top Status Bar */}
          <div className="absolute top-6 left-10 right-10 flex items-center justify-between pointer-events-none z-[500]">
            <div className="flex items-center gap-4 px-7 py-3 floating-bar pointer-events-auto cursor-pointer hover:bg-white/10 transition-all active:scale-95 group border-white/30 shadow-2xl" onClick={() => launchApp('weather')}>
              <i className="fa-solid fa-cloud-sun text-yellow-400 text-xl group-hover:rotate-12 transition-transform"></i>
              <div className="flex flex-col">
                <span className="text-[15px] font-black leading-none text-white">26°C</span>
                <span className="text-[9px] text-white/40 uppercase font-black tracking-widest mt-1">System Environment</span>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-4 px-14 py-4 floating-bar w-full max-w-[480px] pointer-events-auto cursor-text hover:bg-white/15 transition-all shadow-[0_25px_60px_rgba(0,0,0,0.6)] group border-white/40 backdrop-blur-[50px]" onClick={(e) => { e.stopPropagation(); setIsStartOpen(true); }}>
                <i className="fa-solid fa-magnifying-glass text-white/40 text-lg group-hover:text-white transition-colors"></i>
                <span className="text-[15px] text-white/30 font-bold tracking-wide">Search and Discover...</span>
              </div>
            </div>

            <div className="flex items-center gap-7 px-8 py-3 floating-bar pointer-events-auto shadow-2xl border-white/30">
              <div className="flex gap-7 text-white/60 text-[16px] border-r border-white/15 pr-7 items-center">
                <i className={`fa-solid fa-wifi cursor-pointer hover:text-white transition-colors ${!wifiEnabled && 'opacity-30'}`} onClick={(e) => { e.stopPropagation(); setIsControlOpen(!isControlOpen); }}></i>
                <i className={`fa-solid fa-volume-high cursor-pointer hover:text-white transition-colors`} onClick={(e) => { e.stopPropagation(); setIsControlOpen(!isControlOpen); }}></i>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-battery-full text-green-400 text-lg"></i>
                  <span className="text-[11px] font-black text-white/40">100%</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end leading-none gap-1.5 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsControlOpen(!isControlOpen); }}>
                   <span className="text-[16px] font-black tracking-tighter text-white">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   <span className="text-[10px] text-white/40 uppercase font-black tracking-[0.25em]">{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setIsControlOpen(!isControlOpen); }} className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all transform active:scale-90">
                  <i className="fa-solid fa-moon text-lg"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Windows Layer */}
          <div className="relative w-full h-full pt-24 pointer-events-none">
            {windows.map(win => {
              const app = APPS_CONFIG.find(a => a.id === win.id);
              if (!app) return null;
              return (
                <div key={win.id} className={`pointer-events-auto ${win.isMinimized ? 'hidden' : 'block'}`}>
                  <Window
                    title={win.title}
                    icon={`fa-solid ${app.icon} ${app.color}`}
                    onClose={() => closeWindow(win.id)}
                    onMinimize={() => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isMinimized: true } : w))}
                    onMaximize={() => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, isMaximized: !w.isMaximized } : w))}
                    isMaximized={win.isMaximized}
                    zIndex={win.zIndex}
                    onClick={() => focusWindow(win.id)}
                    isLiquidGlass={osSettings.isLiquidGlass}
                  >
                    <app.Component 
                      settings={osSettings} 
                      setSettings={updateSettings} 
                    />
                  </Window>
                </div>
              );
            })}
          </div>

          <Widgets isOpen={isWidgetsOpen} isLiquidGlass={osSettings.isLiquidGlass} />
          <StartMenu apps={APPS_CONFIG} onLaunch={launchApp} isOpen={isStartOpen} isLiquidGlass={osSettings.isLiquidGlass} onPowerAction={handlePowerAction} userName={osSettings.userName} />
          <ControlCenter 
            isOpen={isControlOpen} 
            onClose={() => setIsControlOpen(false)} 
            isLiquidGlass={osSettings.isLiquidGlass} 
            onLock={() => handlePowerAction('lock')}
            wifiState={[wifiEnabled, setWifiEnabled]}
            btState={[bluetoothEnabled, setBluetoothEnabled]}
            airplaneState={[airplaneMode, setAirplaneMode]}
          />
          
          <Taskbar 
            apps={APPS_CONFIG} activeAppId={activeAppId} onLaunch={launchApp} isLiquidGlass={osSettings.isLiquidGlass}
            onStartToggle={(e) => { e?.stopPropagation(); closeAllFlyouts(); setIsStartOpen(!isStartOpen); }}
            onWidgetsToggle={(e) => { e?.stopPropagation(); closeAllFlyouts(); setIsWidgetsOpen(!isWidgetsOpen); }}
            onControlToggle={(e) => { e?.stopPropagation(); closeAllFlyouts(); setIsControlOpen(!isControlOpen); }}
            openWindows={windows.map(w => w.id)}
          />

          {contextMenu && (
            <div 
              style={{ left: contextMenu.x, top: contextMenu.y }}
              className="fixed z-[5000] pointer-events-auto"
            >
              <ContextMenu 
                x={contextMenu.x} 
                y={contextMenu.y} 
                isLiquidGlass={osSettings.isLiquidGlass} 
                onClose={() => setContextMenu(null)} 
                onRefresh={() => setContextMenu(null)} 
                onPersonalize={() => { setContextMenu(null); launchApp('settings'); }} 
              />
            </div>
          )}
        </div>
      )}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[10000]" />
    </div>
  );
};

export default App;
