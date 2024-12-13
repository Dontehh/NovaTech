import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import './Teams.css';
import { useAuthStore } from '../store/authStore'; // Adjust the path based on your project structure


const Teams: React.FC = () => {
  const { user } = useAuthStore(); // Access the user from Zustand store
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [teams, setTeams] = useState<{ id: number; name: string; description?: string }[]>([]);

  useEffect(() => {
    // Fetch teams from Supabase
    const fetchTeams = async () => {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) {
        console.error('Error fetching teams:', error);
      } else {
        setTeams(data || []);
      }
    };
    fetchTeams();
  }, []);

  const handleCreateTeam = async () => {
    if (teamName && user?.id) {
      // Insert new team into Supabase
      const { data, error } = await supabase
        .from('teams')
        .insert({
          name: teamName,
          description: description,
          created_by: user.id, // Use user ID from Zustand store
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
          setTeams([...teams, ...data]); // Add the new team to the list
          setTeamName(''); // Clear team name input
          setDescription(''); // Clear description input
        }
      }
    }  
  };

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
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    }
  };
  

  return (
    <div className="teams-container">
      <h1>Teams</h1>
      <div className="find-teams">
        <h2>Find and Join a Team</h2>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              {team.name}{' '}
              <button className="join-button" onClick={() => handleJoinTeam(team.id)}>
                Join
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="create-team">
        <h2>Create a New Team</h2>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter team description"
        />
        <button className="action-button" onClick={handleCreateTeam}>
          Create Team
        </button>
      </div>
    </div>
  );
};

export default Teams;
