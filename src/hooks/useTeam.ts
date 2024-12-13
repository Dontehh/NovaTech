import { useState } from 'react';
import { createTeam, inviteToTeam, joinTeam, leaveTeam } from '../services/teams';
import { useAuthStore } from '../store/authStore';

export const useTeam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  const create = async (name: string, eventId: string) => {
    if (!user) {
      setError('You must be logged in to create a team');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await createTeam(name, eventId, user.id);
      return true;
    } catch (err) {
      setError('Failed to create team');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const invite = async (teamId: string, email: string) => {
    setLoading(true);
    setError(null);

    try {
      await inviteToTeam(teamId, email);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invite');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const join = async (teamId: string) => {
    if (!user) {
      setError('You must be logged in to join a team');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await joinTeam(teamId, user.id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join team');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const leave = async (teamId: string) => {
    if (!user) {
      setError('You must be logged in to leave a team');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await leaveTeam(teamId, user.id);
      return true;
    } catch (err) {
      setError('Failed to leave team');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    invite,
    join,
    leave,
    loading,
    error,
  };
};