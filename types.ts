
import React from 'react';

export type AppID = 'explorer' | 'browser' | 'copilot' | 'settings' | 'calculator' | 'weather' | 'notepad' | 'store' | 'camera';

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface AppConfig {
  id: AppID;
  name: string;
  icon: string;
  color: string;
  Component: React.ComponentType<any>;
}

export interface OSSettings {
  wallpaper: string;
  isLiquidGlass: boolean;
  currentWifi: string;
  userName: string;
  userEmail: string;
  isDarkMode: boolean;
}
