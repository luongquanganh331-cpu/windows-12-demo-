
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
  userName: string;
  wallpaper: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, userName, wallpaper }) => {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(onLogin, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-[9998] bg-cover bg-center flex flex-col items-center justify-center animate-fade"
      style={{ backgroundImage: `url("${wallpaper}")` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl" />
      
      {/* Top Left Branding */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
         <i className="fa-solid fa-cloud-sun text-2xl text-yellow-400"></i>
         <div className="text-sm font-medium">26°C <span className="text-white/60 ml-1">Partly Cloudy</span></div>
      </div>

      {/* Top Right Tray */}
      <div className="absolute top-8 right-8 flex items-center gap-5 text-white/80 text-sm">
         <i className="fa-solid fa-keyboard"></i>
         <i className="fa-solid fa-volume-high"></i>
         <i className="fa-solid fa-wifi"></i>
         <span className="font-semibold">09:25</span>
         <span className="text-white/40">November 1</span>
         <i className="fa-solid fa-moon"></i>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center animate-slide-up">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 p-[2px] mb-8 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-2 border-black">
            <i className="fa-solid fa-bolt text-white text-4xl"></i>
          </div>
        </div>
        
        <h2 className="text-4xl font-light mb-2 tracking-tight">Good Morning, {userName}!</h2>
        <p className="text-white/50 text-sm mb-10">username@email.com</p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-[320px]">
          <input 
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/80 text-black rounded-lg px-6 py-2 text-center text-lg focus:outline-none shadow-xl transition-all"
          />
        </form>

        {/* Bottom Icons */}
        <div className="mt-40 flex gap-8 text-white/60">
           <button className="hover:text-white transition-colors"><i className="fa-solid fa-universal-access text-2xl"></i></button>
           <button className="hover:text-white transition-colors"><i className="fa-solid fa-power-off text-2xl"></i></button>
        </div>
      </div>

      {/* User Switcher at bottom left */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2">
         <div className="flex items-center gap-3 p-3 px-4 rounded-xl bg-purple-600/60 border border-white/20">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs border border-white/20">
               <i className="fa-solid fa-bolt"></i>
            </div>
            <span className="text-sm font-semibold">{userName}</span>
         </div>
         <div className="flex items-center gap-3 p-3 px-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-orange-400 overflow-hidden border border-white/10 group-hover:border-white/40">
               <img src="https://picsum.photos/id/10/40/40" alt="u2" />
            </div>
            <span className="text-sm text-white/60 group-hover:text-white">Anonymous</span>
         </div>
      </div>
    </div>
  );
};

export default LoginScreen;
