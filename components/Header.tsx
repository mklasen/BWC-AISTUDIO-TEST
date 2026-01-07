
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  icon: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <header className="px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-indigo-600">
          <i className={`fas fa-${icon} text-xl`}></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center -space-x-2 mr-4">
          {[1, 2, 3].map((i) => (
            <img 
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white" 
              src={`https://picsum.photos/seed/${i + 20}/32/32`} 
              alt="Avatar" 
            />
          ))}
          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
            +12
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <i className="fas fa-search text-lg"></i>
        </button>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
          <i className="fas fa-bell text-lg"></i>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
