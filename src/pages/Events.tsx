import React, { useState } from 'react';
import { useEventStore } from '../store/eventStore';
import { useAuthStore } from '../store/authStore';
import { Calendar, Users, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { TeamList } from '../components/TeamList';
import { CreateTeamModal } from '../components/CreateTeamModal';

export const Events: React.FC = () => {
  const events = useEventStore((state) => state.events);
  const joinEvent = useEventStore((state) => state.joinEvent);
  const user = useAuthStore((state) => state.user);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleJoinEvent = (eventId: string) => {
    if (user) {
      joinEvent(eventId, user.id);
    }
  };

  const handleCreateTeam = (eventId: string) => {
    setSelectedEventId(eventId);
    setShowCreateTeam(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={event.facility.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.name}
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{event.currentParticipants} / {event.maxParticipants} participants</span>
                </div>
              </div>

              <div className="flex space-x-3 mb-6">
                <button
                  onClick={() => handleJoinEvent(event.id)}
                  disabled={!user || event.currentParticipants >= event.maxParticipants}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {!user
                    ? 'Login to Join'
                    : event.currentParticipants >= event.maxParticipants
                    ? 'Event Full'
                    : 'Join Event'}
                </button>
                {user && (
                  <button
                    onClick={() => handleCreateTeam(event.id)}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create Team
                  </button>
                )}
              </div>

              <TeamList eventId={event.id} />
            </div>
          </div>
        ))}
      </div>

      {showCreateTeam && selectedEventId && (
        <CreateTeamModal
          eventId={selectedEventId}
          onClose={() => {
            setShowCreateTeam(false);
            setSelectedEventId(null);
          }}
        />
      )}
    </div>
  );
};