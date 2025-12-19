
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
    setTimeout(onLogin, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-[9998] bg-cover bg-center flex flex-col items-center justify-center animate-fade"
      style={{ backgroundImage: `url("${wallpaper}")` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[60px]" />
      
      {/* Top Left Branding */}
      <div className="absolute top-10 left-10 flex items-center gap-4 text-white/80">
         <i className="fa-solid fa-cloud-sun text-2xl text-yellow-400"></i>
         <div className="text-sm font-bold tracking-tight">26°C <span className="text-white/40 ml-1 font-normal">Partly Cloudy</span></div>
      </div>

      {/* Top Right Tray */}
      <div className="absolute top-10 right-10 flex items-center gap-6 text-white/80 text-[13px] font-bold">
         <div className="flex gap-6 text-white/40 mr-4 border-r border-white/10 pr-6">
           <i className="fa-solid fa-wifi"></i>
           <i className="fa-solid fa-volume-high"></i>
         </div>
         <span className="tracking-tighter">09:25 AM</span>
         <span className="text-white/40 font-normal">Nov 01</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center animate-slide-up">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-400 via-indigo-600 to-purple-700 p-[2px] mb-10 shadow-[0_0_60px_rgba(59,130,246,0.3)]">
          <div className="w-full h-full rounded-3xl bg-black flex items-center justify-center overflow-hidden border-2 border-black">
            <i className="fa-solid fa-bolt text-white text-5xl"></i>
          </div>
        </div>
        
        <h2 className="text-5xl font-light mb-2 tracking-tight">Good Morning, {userName}</h2>
        <p className="text-white/30 text-base mb-12 tracking-wide font-light italic">Secure authentication required</p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-[340px]">
          <input 
            type="password"
            autoFocus
            placeholder="PIN"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full bg-white/10 text-white rounded-2xl px-8 py-3.5 text-center text-xl focus:outline-none focus:bg-white/15 border border-white/20 shadow-2xl transition-all ${isLoggingIn ? 'opacity-50 pointer-events-none' : ''}`}
          />
        </form>

        {/* Bottom Icons */}
        <div className="mt-48 flex gap-12 text-white/40">
           <button className="hover:text-white transition-all transform hover:scale-110"><i className="fa-solid fa-universal-access text-2xl"></i></button>
           <button className="hover:text-red-400 transition-all transform hover:scale-110"><i className="fa-solid fa-power-off text-2xl"></i></button>
        </div>
      </div>

      {/* Footer System Name */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
         <span className="text-[10px] text-white/10 uppercase tracking-[1.5em] font-bold">Evolution System 26</span>
      </div>
    </div>
  );
};

export default LoginScreen;
