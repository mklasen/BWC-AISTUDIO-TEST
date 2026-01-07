
import React from 'react';
import { Channel, ViewMode } from '../types';

interface SidebarProps {
  channels: Channel[];
  activeChannelId: string;
  setActiveChannel: (id: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ channels, activeChannelId, setActiveChannel, viewMode, setViewMode }) => {
  return (
    <div className="w-64 md:w-72 bg-slate-900 flex flex-col h-full text-slate-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <i className="fas fa-layer-group text-xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">BWC</h1>
        </div>

        <nav className="space-y-1">
          <button 
            onClick={() => setViewMode(ViewMode.Events)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${viewMode === ViewMode.Events ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-800'}`}
          >
            <i className="fas fa-calendar-day"></i>
            <span className="font-medium">Events Center</span>
          </button>
        </nav>

        <div className="mt-8">
          <div className="px-4 mb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Channels</h2>
            <button className="text-slate-500 hover:text-white transition-colors">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => {
                  setActiveChannel(channel.id);
                  setViewMode(ViewMode.Chat);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${viewMode === ViewMode.Chat && activeChannelId === channel.id ? 'bg-slate-800 text-white border-l-4 border-indigo-500 rounded-l-none' : 'hover:bg-slate-800/50'}`}
              >
                <i className={`fas fa-${channel.icon} text-sm opacity-60`}></i>
                <span className="font-medium truncate">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-xs text-slate-500">Online</p>
          </div>
          <i className="fas fa-cog text-slate-500"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
