import React, { useState } from 'react';
import './Teams.css'; // Import CSS for styling

const Teams: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState<string[]>(['Team A', 'Team B', 'Team C']); // Example teams

  const handleCreateTeam = () => {
    if (teamName) {
      setTeams([...teams, teamName]);
      setTeamName(''); // Clear input after creating a team
    }
  };

  return (
    <div className="teams-container">
      <h1>Teams</h1>
      <div className="find-teams">
        <h2>Find and Join a Team</h2>
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              {team} <button className="join-button">Join</button>
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
        <button className="action-button" onClick={handleCreateTeam}>
          Create Team
        </button>
      </div>
    </div>
  );
};

export default Teams; 