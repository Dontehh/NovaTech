// import { create } from 'zustand';
// import { Event } from '../types';

// interface EventState {
//   events: Event[];
//   selectedEvent: Event | null;
//   setSelectedEvent: (event: Event | null) => void;
//   createEvent: (event: Omit<Event, 'id' | 'participants'>) => void;
//   joinEvent: (eventId: string, userId: string) => void;
// }

// export const useEventStore = create<EventState>((set, get) => ({
//   events: [
//     {
//       id: '1',
//       name: 'Summer Soccer Tournament',
//       description: 'Join our annual summer soccer tournament! All skill levels welcome.',
//       facility: {
//         id: '1',
//         name: 'Soccer Field A',
//         type: 'soccer',
//         description: 'Professional grade soccer field with natural grass',
//         image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
//         available: true,
//       },
//       date: '2024-07-15',
//       startTime: '09:00',
//       endTime: '17:00',
//       maxParticipants: 40,
//       currentParticipants: 12,
//       participants: ['user123', 'user456'], // Example of existing participants
//       teams: [],
//     },
//   ],
//   selectedEvent: null,
//   setSelectedEvent: (event) => set({ selectedEvent: event }),
//   createEvent: (event) => {
//     const newEvent = {
//       ...event,
//       id: Math.random().toString(36).substr(2, 9),
//       participants: [], // Initialize with an empty participants array
//     };
//     set((state) => ({ events: [...state.events, newEvent] }));
//   },
//   joinEvent: (eventId, userId) => {
//     set((state) => {
//       const event = state.events.find((e) => e.id === eventId);
//       if (!event) {
//         throw new Error('Event not found.');
//       }

//       if (event.participants.includes(userId)) {
//         throw new Error('You are already a participant in this event.');
//       }

//       if (event.currentParticipants >= event.maxParticipants) {
//         throw new Error('The event is full. You cannot join.');
//       }

//       return {
//         events: state.events.map((e) =>
//           e.id === eventId
//             ? {
//                 ...e,
//                 currentParticipants: e.currentParticipants + 1,
//                 participants: [...e.participants, userId], // Add user to participants
//               }
//             : e
//         ),
//       };
//     });
//   },
// }));

import { create } from 'zustand';
import { Event } from '../types';

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  errorMessage: string | null; // Stores the error message for display
  setSelectedEvent: (event: Event | null) => void;
  createEvent: (event: Omit<Event, 'id' | 'participants'>) => void;
  joinEvent: (eventId: string, userId: string) => void;
  clearError: () => void; // Clears the error message
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [
    {
      id: '1',
      name: 'Summer Soccer Tournament',
      description: 'Join our annual summer soccer tournament! All skill levels welcome.',
      facility: {
        id: '1',
        name: 'Soccer Field A',
        type: 'soccer',
        description: 'Professional grade soccer field with natural grass',
        image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
        available: true,
      },
      date: '2024-07-15',
      startTime: '09:00',
      endTime: '17:00',
      maxParticipants: 40,
      currentParticipants: 12,
      participants: ['user123', 'user456'], // Example of existing participants
      teams: [],
    },
  ],
  selectedEvent: null,
  errorMessage: null, // Initialize with no error
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  clearError: () => set({ errorMessage: null }),
  createEvent: (event) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      participants: [], // Initialize with an empty participants array
    };
    set((state) => ({ events: [...state.events, newEvent] }));
  },
  joinEvent: (eventId, userId) => {
    const state = get();
    const event = state.events.find((e) => e.id === eventId);
    if (!event) {
      set({ errorMessage: 'Event not found.' });
      return;
    }

    if (event.participants.includes(userId)) {
      set({ errorMessage: 'You are already a participant in this event.' });
      return;
    }

    if (event.currentParticipants >= event.maxParticipants) {
      set({ errorMessage: 'The event is full. You cannot join.' });
      return;
    }

    set({
      events: state.events.map((e) =>
        e.id === eventId
          ? {
              ...e,
              currentParticipants: e.currentParticipants + 1,
              participants: [...e.participants, userId],
            }
          : e
      ),
      errorMessage: null, // Clear any previous error
    });
  },
}));
