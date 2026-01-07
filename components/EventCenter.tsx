
import React, { useState } from 'react';
import { Event } from '../types';

interface EventCenterProps {
  events: Event[];
  onCreateEvent: (event: Omit<Event, 'id'>) => void;
  onToggleRSVP: (eventId: string) => void;
}

const EventCenter: React.FC<EventCenterProps> = ({ events, onCreateEvent, onToggleRSVP }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateEvent({
      ...formData,
      organizer: 'You',
      attendees: ['You']
    });
    setFormData({ title: '', description: '', date: '', time: '', location: '' });
    setShowForm(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Upcoming Events</h3>
            <p className="text-slate-500">Discover and join community gatherings</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            <i className={`fas fa-${showForm ? 'times' : 'plus'}`}></i>
            {showForm ? 'Cancel' : 'Organize Event'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-600">
              <i className="fas fa-magic"></i> Create New Event
            </h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Event Title</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Weekly Code Review"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Discord Voice #1"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                <input 
                  required
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
                <input 
                  required
                  type="time"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="What is this event about?"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-all">
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">
                  {new Date(event.date).getDate()}
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-500 uppercase">
                  {new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}
                </span>
              </div>
              
              <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {event.title}
              </h4>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                {event.description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <i className="far fa-clock w-4 text-indigo-500"></i>
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <i className="fas fa-map-marker-alt w-4 text-indigo-500"></i>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm">
                  <i className="far fa-user w-4 text-indigo-500"></i>
                  <span>Organized by {event.organizer}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex -space-x-2">
                  {event.attendees.map((a, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600" title={a}>
                      {a[0]}
                    </div>
                  ))}
                  <div className="text-xs text-slate-400 self-center ml-4 font-medium">
                    {event.attendees.length} attending
                  </div>
                </div>
                <button 
                  onClick={() => onToggleRSVP(event.id)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${event.attendees.includes('You') ? 'bg-slate-100 text-slate-500' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                >
                  {event.attendees.includes('You') ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCenter;
