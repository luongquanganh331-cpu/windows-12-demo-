
import React, { useState, useEffect, useCallback } from 'react';
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
  const [time, setTime] = useState(new Date());

  const [osSettings, setOsSettings] = useState<OSSettings>({
    wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564',
    isLiquidGlass: true,
    currentWifi: 'LTT_Dev_Network',
    userName: 'Abdi',
    userEmail: 'username@email.com',
    isDarkMode: true
  });

  useEffect(() => {
    const clock = setInterval(() => setTime(new Date()), 1000);
    if (osState === 'booting' || osState === 'restarting') {
      const timer = setTimeout(() => setOsState('locked'), 3000);
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
    { id: 'weather', name: 'Weather', icon: 'fa-cloud-sun', color: 'text-orange-400', component: <WeatherApp /> },
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

  if (osState === 'power-off') {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center animate-fade">
        <div className="text-white/20 text-xs tracking-[0.5em] uppercase font-light">Shutting down system...</div>
      </div>
    );
  }

  if (osState === 'booting' || osState === 'restarting') {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.2)]">
           <i className="fa-solid fa-bolt text-white text-4xl"></i>
        </div>
        <div className="mt-12 text-[10px] text-white/20 uppercase tracking-[0.8em] font-medium animate-pulse">
           Evolution
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url("${osSettings.wallpaper}")` }}
      onClick={closeAllFlyouts}
      onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
    >
      {osState === 'locked' && <LockScreen wallpaper={osSettings.wallpaper} onUnlock={() => setOsState('login')} />}
      {osState === 'login' && <LoginScreen wallpaper={osSettings.wallpaper} userName={osSettings.userName} onLogin={() => setOsState('desktop')} />}

      {/* Desktop Shell Components */}
      {osState === 'desktop' && (
        <div className="relative w-full h-full p-8 animate-fade">
          
          {/* Top Floating Status Bars */}
          <div className="absolute top-8 left-8 right-8 flex items-center justify-between pointer-events-none">
            {/* Weather Widget */}
            <div 
              className="flex items-center gap-3 px-5 py-2.5 floating-bar pointer-events-auto cursor-pointer hover:bg-white/10 transition-all active:scale-95"
              onClick={() => launchApp('weather')}
            >
              <i className="fa-solid fa-cloud-sun text-yellow-400"></i>
              <div className="text-sm font-medium">26°C <span className="text-white/60 ml-2">Partly Cloudy</span></div>
            </div>

            {/* Centered Search Bar */}
            <div className="flex-1 flex justify-center">
              <div 
                className="flex items-center gap-4 px-8 py-3 floating-bar w-full max-w-[400px] pointer-events-auto cursor-text hover:bg-white/10 transition-all shadow-xl"
                onClick={() => setIsStartOpen(true)}
              >
                <i className="fa-solid fa-magnifying-glass text-white/40 text-sm"></i>
                <span className="text-sm text-white/30 font-light">Type here to search</span>
              </div>
            </div>

            {/* System Tray */}
            <div className="flex items-center gap-5 px-6 py-2.5 floating-bar pointer-events-auto shadow-lg">
              <div className="flex gap-5 text-white/60 text-sm border-r border-white/10 pr-5">
                <i className="fa-solid fa-keyboard cursor-pointer hover:text-white transition-colors"></i>
                <i className="fa-solid fa-volume-high cursor-pointer hover:text-white transition-colors"></i>
                <i className="fa-solid fa-wifi cursor-pointer hover:text-white transition-colors"></i>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end leading-none gap-1">
                   <span className="text-sm font-bold tracking-tight">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   <span className="text-[10px] text-white/40 uppercase tracking-tighter">{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                </div>
                <i className="fa-solid fa-moon text-white/40 cursor-pointer hover:text-indigo-400 transition-colors"></i>
              </div>
            </div>
          </div>

          {/* Windows Layer */}
          <div className="relative w-full h-full pt-20">
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

          {/* Taskbar & Menu Layer */}
          <Widgets isOpen={isWidgetsOpen} isLiquidGlass={osSettings.isLiquidGlass} />
          <StartMenu 
            apps={APPS} 
            onLaunch={launchApp} 
            isOpen={isStartOpen} 
            isLiquidGlass={osSettings.isLiquidGlass}
            onPowerAction={handlePowerAction}
            userName={osSettings.userName}
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
            onStartToggle={(e) => { e?.stopPropagation(); setIsStartOpen(!isStartOpen); }}
            onWidgetsToggle={(e) => { e?.stopPropagation(); setIsWidgetsOpen(!isWidgetsOpen); }}
            onControlToggle={(e) => { e?.stopPropagation(); setIsControlOpen(!isControlOpen); }}
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
        </div>
      )}

      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-[10000]" />
    </div>
  );
};

export default App;
