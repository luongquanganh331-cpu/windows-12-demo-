
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
      className="fixed inset-0 z-[9998] bg-cover bg-center flex flex-col items-center justify-center animate-in fade-in duration-700"
      style={{ backgroundImage: `url("${wallpaper}")` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
      
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full p-8 rounded-[40px] liquid-glass">
        <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden mb-6 shadow-2xl">
          <img src="https://picsum.photos/200/200" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        
        <h2 className="text-3xl font-light mb-8 tracking-tight">{userName}</h2>
        
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="relative">
            <input 
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PIN"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:tracking-normal placeholder:text-white/20"
            />
            {isLoggingIn && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <i className="fa-solid fa-circle-notch animate-spin text-blue-400"></i>
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-8 text-white/40 text-sm">
             <button type="button" className="hover:text-white transition-colors">I forgot my PIN</button>
             <button type="button" className="hover:text-white transition-colors">Sign-in options</button>
          </div>
        </form>

        <div className="mt-12 flex gap-6 text-white/60">
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
             <i className="fa-solid fa-wifi text-xs"></i>
           </button>
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
             <i className="fa-solid fa-universal-access text-xs"></i>
           </button>
           <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
             <i className="fa-solid fa-power-off text-xs"></i>
           </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;