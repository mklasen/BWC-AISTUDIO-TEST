
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: 'text' | 'event';
  eventId?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: string[];
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export enum ViewMode {
  Chat = 'chat',
  Events = 'events',
  Settings = 'settings'
}
