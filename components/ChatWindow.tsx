
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onOpenEventCreator: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onOpenEventCreator }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      if (inputText.startsWith('/event')) {
        onOpenEventCreator();
        setInputText('');
      } else {
        onSendMessage(inputText);
        setInputText('');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/30">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <i className="fas fa-comments text-6xl mb-4"></i>
            <p className="text-lg font-medium">No messages yet. Start the conversation!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.senderId === 'user-1' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white shadow-sm ${msg.senderId === 'system' ? 'bg-amber-500' : msg.senderId === 'user-1' ? 'bg-indigo-600' : 'bg-slate-400'}`}>
              {msg.senderName[0]}
            </div>
            <div className={`max-w-[70%] ${msg.senderId === 'user-1' ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
                <span className="text-[10px] text-slate-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              
              {msg.type === 'event' ? (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl shadow-sm inline-block text-left">
                  <div className="flex items-center gap-3 mb-2 text-amber-800">
                    <i className="fas fa-calendar-star text-xl"></i>
                    <h4 className="font-bold">{msg.content}</h4>
                  </div>
                  <button 
                    onClick={onOpenEventCreator}
                    className="text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                  >
                    View in Event Center
                  </button>
                </div>
              ) : (
                <div className={`px-4 py-2.5 rounded-2xl shadow-sm inline-block text-sm ${msg.senderId === 'user-1' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
                  {msg.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message or use /event to plan something..."
            className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 pr-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <div className="absolute right-2 top-2 flex gap-1">
            <button 
              type="button"
              onClick={onOpenEventCreator}
              className="p-2.5 text-slate-400 hover:text-amber-500 transition-colors"
              title="Quick Event"
            >
              <i className="fas fa-calendar-plus text-lg"></i>
            </button>
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              <i className="fas fa-paper-plane px-1"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
