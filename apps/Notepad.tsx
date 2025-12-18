
import React, { useState, useEffect } from 'react';

const Notepad: React.FC = () => {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled.txt');

  useEffect(() => {
    const saved = localStorage.getItem('notepad_content');
    if (saved) setContent(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem('notepad_content', content);
    alert('Note saved to system!');
  };

  const handleNew = () => {
    if (confirm('Create new note? Current changes will be lost.')) {
      setContent('');
      localStorage.removeItem('notepad_content');
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      <div className="h-8 flex items-center px-4 bg-white/5 border-b border-white/5 gap-4 text-[11px] text-white/60">
        <button onClick={handleNew} className="hover:text-white transition-colors">File</button>
        <button className="hover:text-white transition-colors">Edit</button>
        <button className="hover:text-white transition-colors">View</button>
        <button onClick={handleSave} className="ml-auto bg-blue-600 text-white px-3 py-0.5 rounded-sm hover:bg-blue-500">Save</button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full bg-transparent p-6 text-sm text-white/90 font-mono focus:outline-none resize-none"
        placeholder="Start typing..."
        spellCheck={false}
      />
      <div className="h-6 bg-blue-600 flex items-center px-4 justify-between text-[10px] text-white/80">
        <span>{fileName}</span>
        <span>UTF-8 | Windows (CRLF)</span>
      </div>
    </div>
  );
};

export default Notepad;
