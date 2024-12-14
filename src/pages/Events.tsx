import React, { useState } from 'react';
import { useEventStore } from '../store/eventStore';
import { useAuthStore } from '../store/authStore';
import { Calendar, Users, Clock, Plus } from 'lucide-react';
import supabase from '../config/supabaseClient';
import { format } from 'date-fns';
import { TeamList } from '../components/TeamList';

export const Events: React.FC = () => {
  const events = useEventStore((state) => state.events);
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const joinEvent = useEventStore((state) => state.joinEvent);
  const { user } = useAuthStore(); // Access the user from Zustand store
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');

  const handleJoinEvent = (eventId: string) => {
    if (user) {
      const event = events.find(e => e.id === eventId);
      const hasJoined = event?.participants?.includes(user.id);
      
      if (!hasJoined) {
        joinEvent(eventId, user.id);
      }
    }
  };

  const handleCreateTeam = async (eventId: string) => {
    if (teamName && user?.id) {
      // Insert new team into Supabase
      const { data, error } = await supabase
        .from('teams')
        .insert({
          name: teamName,
          description: description,
          created_by: user.id, // Use user ID from Zustand store
          event_id: eventId,
        })
        .select();
  
      if (error) {
        console.error('Error creating team:', error);
      } else if (data) {
        // Assuming the newly created team is in data[0]
        const teamId = data[0]?.id; 
        // Insert the user into the team_members table
        const { error: insertError } = await supabase
          .from('team_members')
          .insert({
            userID: user.id, // Use user ID from Zustand store
            teamID: teamId,   // Use the team ID from the newly created team
          });
  
        if (insertError) {
          console.error('Error adding user to team:', insertError);
        } else {
          alert('You have successfully created and joined the team!');
          setTeamName(''); // Clear team name input
          setDescription(''); // Clear description input
          setShowForm(false); // Hide the form after creating the team
        }
      }
    }  
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {events.map((event) => {
          const hasJoined = event.participants?.includes(user?.id || '');
          
          return (
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
                    disabled={hasJoined || event.currentParticipants >= event.maxParticipants}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {hasJoined
                      ? 'Already Joined'
                      : event.currentParticipants >= event.maxParticipants
                      ? 'Event Full'
                      : 'Join Event'}
                  </button>
                  {!hasJoined && (
                    <div>
                      <button
                        onClick={() => setShowForm(!showForm)} // Toggle the form visibility
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Create Team
                      </button>

                      {showForm && (
                        <div className="mt-4">
                          <h2>Create New Team</h2>
                          <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Enter team name"
                            className="border p-2 rounded-md w-full mb-2"
                          />
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter team description"
                            className="border p-2 rounded-md w-full mb-2"
                          />
                          <button
                            onClick={async () => await handleCreateTeam(event.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                          >
                            Create Team
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <TeamList eventId={event.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
