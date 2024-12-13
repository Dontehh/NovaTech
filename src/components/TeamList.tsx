import React from 'react';
import { useTeamStore } from '../store/teamStore';
import { useAuthStore } from '../store/authStore';
import { Users } from 'lucide-react';

interface TeamListProps {
  eventId: string;
}

export const TeamList: React.FC<TeamListProps> = ({ eventId }) => {
  const teams = useTeamStore((state) => state.teams.filter((t) => t.eventId === eventId));
  const user = useAuthStore((state) => state.user);
  const { leaveTeam, joinTeam } = useTeamStore();

  const handleLeaveTeam = (teamId: string) => {
    if (user) {
      leaveTeam(teamId, user.id);
    }
  };

  const handleJoinTeam = (teamId: string) => {
    if (user) {
      joinTeam(teamId, user);
    }
  };

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
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{team.members.length} members</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">Members:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {team.members.map((member) => (
                    <span
                      key={member.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {member.name}
                    </span>
                  ))}
                </div>
              </div>

              {user && (
                <div className="flex justify-end">
                  {team.members.some((m) => m.id === user.id) ? (
                    <button
                      onClick={() => handleLeaveTeam(team.id)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Leave Team
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinTeam(team.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Join Team
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};