import { create } from 'zustand';
import { Team, User } from '../types';
import { supabase } from '../lib/supabase';

interface TeamState {
  teams: Team[];
  createTeam: (name: string, eventId: string, creator: User) => Promise<void>;
  joinTeam: (teamId: string, user: User) => Promise<void>;
  leaveTeam: (teamId: string, userId: string) => Promise<void>;
  deleteEmptyTeam: (teamId: string) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  teams: [],
  createTeam: async (name, eventId, creator) => {
    try {
      const { data: team, error } = await supabase
        .from('teams')
        .insert([{ name, event_id: eventId, created_by: creator.id }])
        .select()
        .single();

      if (error) throw error;

      // Add creator as first member
      await supabase
        .from('team_members')
        .insert([{ team_id: team.id, user_id: creator.id }]);

      set((state) => ({
        teams: [...state.teams, { ...team, members: [creator] }],
      }));
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  },
  joinTeam: async (teamId, user) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .insert([{ team_id: teamId, user_id: user.id }]);

      if (error) throw error;

      set((state) => ({
        teams: state.teams.map((team) =>
          team.id === teamId
            ? { ...team, members: [...team.members, user] }
            : team
        ),
      }));
    } catch (error) {
      console.error('Error joining team:', error);
      throw error;
    }
  },
  leaveTeam: async (teamId, userId) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('user_id', userId);

      if (error) throw error;

      const updatedTeams = get().teams.map((team) =>
        team.id === teamId
          ? { ...team, members: team.members.filter((m) => m.id !== userId) }
          : team
      );

      set({ teams: updatedTeams });

      // Check if team is empty and delete if necessary
      const team = updatedTeams.find((t) => t.id === teamId);
      if (team && team.members.length === 0) {
        await get().deleteEmptyTeam(teamId);
      }
    } catch (error) {
      console.error('Error leaving team:', error);
      throw error;
    }
  },
  deleteEmptyTeam: async (teamId) => {
    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);

      if (error) throw error;

      set((state) => ({
        teams: state.teams.filter((team) => team.id !== teamId),
      }));
    } catch (error) {
      console.error('Error deleting empty team:', error);
      throw error;
    }
  },
}));