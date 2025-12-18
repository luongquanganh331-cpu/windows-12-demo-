
import React, { useState, useRef, useEffect } from 'react';
import { getCopilotResponse } from '../services/geminiService';

const Copilot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Hello! I'm Copilot, your Windows 12 AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getCopilotResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900/50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-white/90 border border-white/5'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-2xl animate-pulse flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Copilot;
