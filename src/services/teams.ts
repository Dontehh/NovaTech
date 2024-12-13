import supabase from '../config/supabaseClient';
import { Team, User } from '../types';

// export const createTeam = async (
//   name: string,
//   eventId: string,
//   creatorId: string
// ): Promise<Team> => {
//   const { data: team, error } = await supabase
//     .from('teams')
//     .insert([{ name, event_id: eventId, created_by: creatorId }])
//     .select()
//     .single();

//   if (error) throw error;

//   // Add creator as first member
//   await supabase
//     .from('team_members')
//     .insert([{ team_id: team.id, user_id: creatorId }]);

//   return team;
// };

// Utility function to validate UUIDs
const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export const createTeam = async (
  name: string,
  eventId: string,
  creatorId: string
): Promise<Team> => {
  // Input validation
  if (!name) {
    throw new Error('Invalid input: "name" is required.');
  }
  if (!isValidUUID(eventId)) {
    throw new Error(`Invalid input: "eventId" must be a valid UUID. Received: ${eventId}`);
  }
  if (!isValidUUID(creatorId)) {
    throw new Error(`Invalid input: "creatorId" must be a valid UUID. Received: ${creatorId}`);
  }

  try {
    // Insert the team into the database
    const { data: team, error } = await supabase
      .from('teams')
      .insert([{ name, event_id: eventId, created_by: creatorId }])
      .select()
      .single();

    if (error) {
      console.error('Error inserting team:', error);
      throw new Error(`Failed to create team: ${error.message || JSON.stringify(error)}`);
    }

    // Add the creator as the first member of the team
    const { error: memberError } = await supabase
      .from('team_members')
      .insert([{ team_id: team.id, user_id: creatorId }]);

    if (memberError) {
      console.error('Error adding creator to team:', memberError);
      throw new Error(`Failed to add creator to team: ${memberError.message || JSON.stringify(memberError)}`);
    }

    return team;
  } catch (err) {
    console.error('Error creating team:', err);
    throw new Error(`Unexpected error: ${err.message || JSON.stringify(err)}`);
  }
};


export const inviteToTeam = async (teamId: string, email: string): Promise<void> => {
  // Find user by email
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (userError || !user) {
    throw new Error('User not found');
  }

  // Check if user is already in team
  const { data: existingMember } = await supabase
    .from('team_members')
    .select('*')
    .eq('team_id', teamId)
    .eq('user_id', user.id)
    .single();

  if (existingMember) {
    throw new Error('User is already a team member');
  }

  // Create invitation
  const { error: inviteError } = await supabase
    .from('team_invites')
    .insert([{ team_id: teamId, user_id: user.id }]);

  if (inviteError) throw inviteError;
};

export const joinTeam = async (teamId: string, userId: string): Promise<void> => {
  // Check team capacity
  const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*, event:events(*)')
    .eq('id', teamId)
    .single();

  if (teamError || !team) throw new Error('Team not found');

  const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .eq('team_id', teamId);

  if (members && members.length >= team.event.max_team_size) {
    throw new Error('Team is full');
  }

  // Add member
  const { error } = await supabase
    .from('team_members')
    .insert([{ team_id: teamId, user_id: userId }]);

  if (error) throw error;
};

export const leaveTeam = async (teamId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('team_id', teamId)
    .eq('user_id', userId);

  if (error) throw error;

  // Check if team is empty
  const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .eq('team_id', teamId);

  if (!members || members.length === 0) {
    // Delete empty team
    await supabase
      .from('teams')
      .delete()
      .eq('id', teamId);
  }
};

export const getTeamMembers = async (teamId: string): Promise<User[]> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('users(*)')
    .eq('team_id', teamId);

  if (error) throw error;
  return data?.map(d => d.users) || [];
};