
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import EventCenter from './components/EventCenter';
import Header from './components/Header';
import { Message, Event, Channel, ViewMode } from './types';

const INITIAL_CHANNELS: Channel[] = [
  { id: 'general', name: 'General', description: 'Main hangout for everyone', icon: 'hashtag' },
  { id: 'planning', name: 'Event Planning', description: 'Organize upcoming BWC meets', icon: 'calendar-check' },
  { id: 'random', name: 'Random', description: 'Off-topic chatter', icon: 'bolt' },
];

const App: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<Channel>(INITIAL_CHANNELS[0]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Chat);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    general: [
      { id: '1', senderId: 'ai', senderName: 'BWC Assistant', content: 'Welcome to BWC! Type /event to quickly create an event.', timestamp: Date.now(), type: 'text' }
    ],
    planning: [],
    random: []
  });
  const [events, setEvents] = useState<Event[]>([
    {
      id: 'e1',
      title: 'Community Launch Party',
      description: 'Celebrating the start of BWC platform!',
      date: '2023-12-25',
      time: '18:00',
      location: 'Virtual Lounge',
      organizer: 'System',
      attendees: ['User']
    }
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'user-1',
      senderName: 'You',
      content: text,
      timestamp: Date.now(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), newMessage]
    }));
  };

  const handleCreateEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = { ...event, id: Math.random().toString(36).substr(2, 9) };
    setEvents(prev => [...prev, newEvent]);
    
    // Also post a notification message to the current channel
    const eventMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'system',
      senderName: 'BWC Events',
      content: `New Event Created: ${event.title}`,
      timestamp: Date.now(),
      type: 'event',
      eventId: newEvent.id
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), eventMsg]
    }));
    
    setViewMode(ViewMode.Chat);
  };

  const toggleRSVP = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const isAttending = e.attendees.includes('You');
        return {
          ...e,
          attendees: isAttending 
            ? e.attendees.filter(a => a !== 'You') 
            : [...e.attendees, 'You']
        };
      }
      return e;
    }));
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      <Sidebar 
        channels={INITIAL_CHANNELS} 
        activeChannelId={activeChannel.id} 
        setActiveChannel={(id) => {
          const channel = INITIAL_CHANNELS.find(c => c.id === id);
          if (channel) {
            setActiveChannel(channel);
            setViewMode(ViewMode.Chat);
          }
        }}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header 
          title={viewMode === ViewMode.Chat ? activeChannel.name : 'Events Center'} 
          subtitle={viewMode === ViewMode.Chat ? activeChannel.description : 'All upcoming BWC gatherings'}
          icon={viewMode === ViewMode.Chat ? activeChannel.icon : 'calendar-alt'}
        />
        
        <div className="flex-1 overflow-hidden relative bg-white m-2 rounded-2xl shadow-sm border border-slate-200">
          {viewMode === ViewMode.Chat ? (
            <ChatWindow 
              messages={messages[activeChannel.id] || []} 
              onSendMessage={handleSendMessage}
              onOpenEventCreator={() => setViewMode(ViewMode.Events)}
            />
          ) : (
            <EventCenter 
              events={events} 
              onCreateEvent={handleCreateEvent}
              onToggleRSVP={toggleRSVP}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
