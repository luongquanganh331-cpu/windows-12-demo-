
import React, { useState } from 'react';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com/search?igu=1');
  const [inputValue, setInputValue] = useState('https://www.google.com');

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputValue;
    if (!target.startsWith('http')) target = 'https://' + target;
    setUrl(`https://www.bing.com/search?q=${encodeURIComponent(target)}&igu=1`);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-12 bg-zinc-100 border-b flex items-center px-4 gap-4 text-zinc-600">
        <div className="flex gap-4">
          <i className="fa-solid fa-arrow-left cursor-pointer hover:text-zinc-900"></i>
          <i className="fa-solid fa-arrow-right cursor-pointer hover:text-zinc-900"></i>
          <i className="fa-solid fa-rotate-right cursor-pointer hover:text-zinc-900"></i>
        </div>
        <form onSubmit={handleNavigate} className="flex-1">
          <input 
            className="w-full bg-zinc-200/50 border border-zinc-200 rounded-full px-4 py-1 text-xs focus:outline-none focus:border-zinc-300"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <i className="fa-solid fa-star cursor-pointer hover:text-zinc-900"></i>
      </div>
      <div className="flex-1 bg-white">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Browser View"
        />
      </div>
    </div>
  );
};

export default Browser;
