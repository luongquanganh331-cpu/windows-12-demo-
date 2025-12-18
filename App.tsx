
import React, { useState, useEffect, useCallback } from 'react';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import Window from './components/Window';
import Explorer from './apps/Explorer';
import Browser from './apps/Browser';
import Copilot from './apps/Copilot';
import Weather from './apps/Weather';
import Calculator from './apps/Calculator';
import Notepad from './apps/Notepad';
import Settings from './apps/Settings';
import LockScreen from './components/LockScreen';
import LoginScreen from './components/LoginScreen';
import ControlCenter from './components/ControlCenter';
import Widgets from './components/Widgets';
import ContextMenu from './components/ContextMenu';
import { AppID, WindowState, AppConfig, OSSettings } from './types';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [osState, setOsState] = useState<'booting' | 'locked' | 'login' | 'desktop' | 'power-off' | 'restarting'>('booting');
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
  
  const [osSettings, setOsSettings] = useState<OSSettings>({
    wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564',
    isLiquidGlass: true,
    currentWifi: 'LTT_Dev_Network',
    userName: 'LTT Developer',
    userEmail: 'admin@evolution.sys',
    isDarkMode: true
  });

  useEffect(() => {
    if (osState === 'booting' || osState === 'restarting') {
      const timer = setTimeout(() => setOsState('locked'), 3000);
      return () => clearTimeout(timer);
    }
  }, [osState]);

  const closeAllFlyouts = useCallback(() => {
    setIsStartOpen(false);
    setIsWidgetsOpen(false);
    setIsControlOpen(false);
    setContextMenu(null);
  }, []);

  const updateSettings = (partial: Partial<OSSettings>) => {
    setOsSettings(prev => ({ ...prev, ...partial }));
  };

  const handlePowerAction = (action: 'shutdown' | 'restart' | 'lock') => {
    closeAllFlyouts();
    if (action === 'lock') setOsState('locked');
    if (action === 'restart') setOsState('restarting');
    if (action === 'shutdown') setOsState('power-off');
  };

  const APPS: AppConfig[] = [
    { id: 'copilot', name: 'Copilot', icon: 'fa-microchip', color: 'text-blue-400', component: <Copilot /> },
    { id: 'explorer', name: 'File Explorer', icon: 'fa-folder', color: 'text-yellow-400', component: <Explorer /> },
    { id: 'browser', name: 'Browser', icon: 'fa-earth-americas', color: 'text-blue-500', component: <Browser /> },
    { id: 'weather', name: 'Weather', icon: 'fa-cloud-sun', color: 'text-orange-400', component: <Weather /> },
    { id: 'notepad', name: 'Notepad', icon: 'fa-note-sticky', color: 'text-zinc-400', component: <Notepad /> },
    { id: 'calculator', name: 'Calculator', icon: 'fa-calculator', color: 'text-green-500', component: <Calculator /> },
    { id: 'settings', name: 'Settings', icon: 'fa-gear', color: 'text-zinc-500', component: <Settings settings={osSettings} setSettings={updateSettings} /> },
  ];

  const launchApp = (id: AppID) => {
    closeAllFlyouts();
    const existing = windows.find(w => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w));
        setZIndexCounter(prev => prev + 1);
      }
      setActiveAppId(id);
      focusWindow(id);
      return;
    }
    const appConfig = APPS.find(a => a.id === id);
    if (!appConfig) return;
    const newWindow: WindowState = {
      id, title: appConfig.name, isOpen: true, isMinimized: false, isMaximized: false, zIndex: zIndexCounter + 1
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveAppId(id);
    setZIndexCounter(prev => prev + 1);
  };

  const closeWindow = (id: AppID) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeAppId === id) setActiveAppId(null);
  };

  const focusWindow = (id: AppID) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w));
    setActiveAppId(id);
    setZIndexCounter(prev => prev + 1);
    closeAllFlyouts();
  };

  // Power Off Screen
  if (osState === 'power-off') {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center animate-in fade-in duration-1000">
        <div className="text-white/40 text-sm tracking-[0.5em] uppercase">Shutting down...</div>
      </div>
    );
  }

  if (osState === 'booting' || osState === 'restarting') {
    return (
      <div className="w-screen h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-20 h-20 relative animate-[spin_3s_linear_infinite]">
           <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full" />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-blue-500">
             <path d="M10.5,2V11.5H2V3A1,1,0,0,1,3,2Z" />
             <path d="M22,2V11.5H12.5V2H21A1,1,0,0,1,22,2Z" />
             <path d="M10.5,12.5V22H3a1,1,0,0,1-1-1V12.5Z" />
             <path d="M22,12.5V21a1,1,0,0,1-1,1H12.5V12.5Z" />
          </svg>
          <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium mt-6">
            {osState === 'restarting' ? 'Restarting' : 'Evolution'}
          </span>
        </div>
      </div>
    );
  }

  const glassClass = osSettings.isLiquidGlass ? 'liquid-glass' : 'bg-[#1c1c1c] border-white/10';

  return (
    <div 
      className="w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url("${osSettings.wallpaper}")` }}
      onClick={closeAllFlyouts}
      onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
    >
      {osState === 'locked' && (
        <LockScreen 
          wallpaper={osSettings.wallpaper} 
          onUnlock={() => setOsState('login')} 
        />
      )}

      {osState === 'login' && (
        <LoginScreen 
          wallpaper={osSettings.wallpaper}
          userName={osSettings.userName}
          onLogin={() => setOsState('desktop')}
        />
      )}

      {/* Desktop Workspace */}
      <div className={`relative w-full h-full p-8 transition-all duration-700 ${osState === 'desktop' ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none blur-3xl'}`}>
        <div className="flex flex-col gap-10 flex-wrap h-[calc(100%-150px)] w-min">
           {[
             { id: 'explorer', icon: 'fa-folder', color: 'text-yellow-400', name: 'System' },
             { id: 'copilot', icon: 'fa-microchip', color: 'text-blue-400', name: 'Copilot' },
             { id: 'settings', icon: 'fa-gear', color: 'text-zinc-300', name: 'Settings' }
           ].map(item => (
             <div 
               key={item.id}
               className="flex flex-col items-center gap-2 group w-24 cursor-pointer"
               onDoubleClick={() => launchApp(item.id as AppID)}
             >
                <div className="w-16 h-16 flex items-center justify-center text-5xl transition-all group-hover:scale-110 group-active:scale-95 drop-shadow-2xl">
                  <i className={`fa-solid ${item.icon} ${item.color}`}></i>
                </div>
                <span className="text-[10px] font-bold text-white text-center bg-black/40 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/5 whitespace-nowrap">
                  {item.name}
                </span>
             </div>
           ))}
        </div>

        {/* Windows */}
        {windows.map(win => {
          const app = APPS.find(a => a.id === win.id);
          if (!app || win.isMinimized) return null;
          return (
            <Window
              key={win.id}
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
              {app.component}
            </Window>
          );
        })}
      </div>

      {/* OS Shell Layer */}
      {osState === 'desktop' && (
        <>
          <Widgets isOpen={isWidgetsOpen} isLiquidGlass={osSettings.isLiquidGlass} />
          <StartMenu 
            apps={APPS} 
            onLaunch={launchApp} 
            isOpen={isStartOpen} 
            isLiquidGlass={osSettings.isLiquidGlass}
            onPowerAction={handlePowerAction}
          />
          <ControlCenter 
            isOpen={isControlOpen} 
            onClose={() => setIsControlOpen(false)} 
            isLiquidGlass={osSettings.isLiquidGlass}
            onLock={() => handlePowerAction('lock')}
          />
          
          <Taskbar 
            apps={APPS}
            activeAppId={activeAppId}
            onLaunch={launchApp}
            isLiquidGlass={osSettings.isLiquidGlass}
            onStartToggle={(e) => { e?.stopPropagation(); setIsStartOpen(!isStartOpen); setIsWidgetsOpen(false); setIsControlOpen(false); }}
            onWidgetsToggle={(e) => { e?.stopPropagation(); setIsWidgetsOpen(!isWidgetsOpen); setIsStartOpen(false); setIsControlOpen(false); }}
            onControlToggle={(e) => { e?.stopPropagation(); setIsControlOpen(!isControlOpen); setIsStartOpen(false); setIsWidgetsOpen(false); }}
            openWindows={windows.map(w => w.id)}
          />

          {contextMenu && (
            <ContextMenu 
              x={contextMenu.x} y={contextMenu.y} 
              isLiquidGlass={osSettings.isLiquidGlass}
              onClose={() => setContextMenu(null)}
              onRefresh={() => setContextMenu(null)}
              onPersonalize={() => { setContextMenu(null); launchApp('settings'); }}
            />
          )}
        </>
      )}

      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[10000]" />
    </div>
  );
};

export default App;
