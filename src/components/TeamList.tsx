import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import supabase from '../config/supabaseClient';

interface TeamListProps {
  eventId: string;
}

export const TeamList: React.FC<TeamListProps> = ({ eventId }) => {
  const [teams, setTeams] = useState<any[]>([]); // State to store teams
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  // Fetch teams data from Supabase
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('teams')
        .select('id, name, number_members')
        .eq('event_id', eventId);

      if (error) {
        setError(error.message);
      } else {
        setTeams(data || []);
      }
      setLoading(false);
    };

    fetchTeams();
     // Set up real-time subscription to listen for changes in the `teams` table
      const channel = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, (payload) => {
        console.log('Change received!', payload);

        // Ensure correct types for each event
        if (payload.eventType === 'INSERT' && payload.new) {
          setTeams((prevTeams) => [...prevTeams, payload.new as { id: number; name: string; description?: string }]); // Add new team
        } else if (payload.eventType === 'UPDATE' && payload.new) {
          setTeams((prevTeams) =>
            prevTeams.map((team) =>
              team.id === (payload.new as { id: number }).id ? { ...team, ...payload.new } : team
            )
          ); // Update the team
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setTeams((prevTeams) =>
            prevTeams.filter((team) => team.id !== (payload.old as { id: number }).id)
          ); // Remove deleted team
        }
      })
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      channel.unsubscribe();
    };

  }, [eventId]);


  
  const handleJoinTeam = async (teamId: number) => {
    if (user?.id) {
      try {
        // Fetch team details to check the creator
        const { data: team, error: fetchError } = await supabase
          .from('teams')
          .select('created_by')
          .eq('id', teamId)
          .single();
  
        if (fetchError) {
          console.error('Error fetching team details:', fetchError);
          return;
        }
  
        // Check if the user is the creator of the team
        if (team?.created_by === user.id) {
          alert('You cannot join a team that you created.');
          return;
        }
  
        // Add the user to the team
        const { error: insertError } = await supabase
          .from('team_members')
          .insert({
            userID: user.id, // Use user ID from Zustand store
            teamID: teamId,
          });
  
        if (insertError) {
          console.error('Error joining team:', insertError);
          alert('You are already part of that team!');
        } else {
          alert('You have joined the team!');
          // Update the teams state to reflect the new membership
          setTeams((prevTeams) =>
          prevTeams.map((team) =>
            team.id === teamId
              ? { ...team, team_members: [...team.team_members, { userID: user.id }] }
              : team
          )
        );
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    }
  };

  if (loading) {
    return <p>Loading teams...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
      {teams.length === 0 ? (
        <p className="text-gray-600">No teams have been created yet.</p>
      ) : (
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{team.name}</h4>
                <span className="text-gray-600">{team.number_members} members</span>
              </div>

              {user && (
                <div className="flex justify-end">
                    {team.team_members?.some((m: any) => m.userID === user.id) ? (
                      // If the user is already a member, hide the button
                      <button
                        disabled
                        className="text-sm text-gray-400 cursor-not-allowed"
                      >
                        Already a Member
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinTeam(team.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        Join Team
                      </button>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

