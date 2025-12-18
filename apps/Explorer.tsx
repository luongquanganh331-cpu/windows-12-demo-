
import React, { useState } from 'react';

const Explorer: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState('Quick Access');

  const navigation = [
    { name: 'Quick Access', icon: 'fa-star', color: 'text-yellow-400' },
    { name: 'Desktop', icon: 'fa-desktop', color: 'text-blue-400' },
    { name: 'Documents', icon: 'fa-file-lines', color: 'text-yellow-400' },
    { name: 'Downloads', icon: 'fa-download', color: 'text-green-400' },
    { name: 'Music', icon: 'fa-music', color: 'text-pink-400' },
    { name: 'Pictures', icon: 'fa-image', color: 'text-purple-400' },
    { name: 'Videos', icon: 'fa-video', color: 'text-red-400' },
  ];

  const contentMap: Record<string, any[]> = {
    'Quick Access': [
      { name: 'Project_Alpha.docx', type: 'Word', size: '24 KB', modified: '2 hours ago' },
      { name: 'Budget_2025.xlsx', type: 'Excel', size: '56 KB', modified: 'Yesterday' },
      { name: 'Vacation.jpg', type: 'Image', size: '2.1 MB', modified: 'Oct 12' },
    ],
    'Desktop': [
      { name: 'My Files', type: 'Folder', size: '--', modified: 'Today' },
      { name: 'Shortcut_Chrome', type: 'App', size: '--', modified: 'System' },
    ],
    'Documents': [
      { name: 'Resume_2024.pdf', type: 'PDF', size: '420 KB', modified: 'Nov 5' },
      { name: 'Taxes.xlsx', type: 'Excel', size: '1.2 MB', modified: 'Jan 10' },
    ],
    'Pictures': [
      { name: 'Family_Trip.jpg', type: 'Image', size: '4.5 MB', modified: 'Dec 25' },
      { name: 'Profile.png', type: 'Image', size: '800 KB', modified: 'Today' },
    ]
  };

  const getFiles = () => contentMap[currentFolder] || contentMap['Quick Access'];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'Word': return 'fa-file-word text-blue-400';
      case 'Excel': return 'fa-file-excel text-green-400';
      case 'PDF': return 'fa-file-pdf text-red-400';
      case 'Image': return 'fa-file-image text-purple-400';
      case 'Folder': return 'fa-folder text-yellow-500';
      default: return 'fa-file text-zinc-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900/40">
      <div className="h-10 flex items-center px-4 bg-white/5 border-b border-white/5 gap-4">
        <div className="flex gap-4 text-xs text-white/40">
          <i className="fa-solid fa-arrow-left hover:text-white cursor-pointer"></i>
          <i className="fa-solid fa-arrow-right opacity-30"></i>
          <i className="fa-solid fa-arrow-up hover:text-white cursor-pointer"></i>
        </div>
        <div className="flex-1 bg-white/5 rounded px-3 py-1 text-[11px] border border-white/10 flex items-center gap-2">
           <i className="fa-solid fa-house text-[10px] text-white/40"></i>
           <span className="text-white/40">/</span>
           <span>{currentFolder}</span>
        </div>
        <div className="w-48 bg-white/5 rounded px-3 py-1 text-[11px] border border-white/10 flex items-center gap-2">
           <i className="fa-solid fa-magnifying-glass text-[10px] text-white/40"></i>
           <span className="text-white/20 italic">Search</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-1">
          {navigation.map(nav => (
            <div 
              key={nav.name}
              onClick={() => setCurrentFolder(nav.name)}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${currentFolder === nav.name ? 'bg-white/10 text-white font-medium' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <i className={`fa-solid ${nav.icon} ${nav.color}`}></i>
              <span>{nav.name}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            <div className="flex items-center text-[10px] font-bold text-white/40 border-b border-white/5 pb-2 mb-2 uppercase tracking-wider">
               <span className="w-1/2">Name</span>
               <span className="w-1/4">Date Modified</span>
               <span className="w-1/4 text-right">Size</span>
            </div>
            {getFiles().map((file, idx) => (
              <div key={idx} className="flex items-center px-2 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer group transition-colors">
                <div className="w-1/2 flex items-center gap-3">
                   <i className={`fa-solid ${getFileIcon(file.type)} text-lg`}></i>
                   <span className="text-xs text-white/90 group-hover:text-white truncate">{file.name}</span>
                </div>
                <div className="w-1/4 text-[10px] text-white/40 group-hover:text-white/60">{file.modified}</div>
                <div className="w-1/4 text-[10px] text-white/40 group-hover:text-white/60 text-right">{file.size}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
