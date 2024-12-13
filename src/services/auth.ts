import supabase from '../config/supabaseClient';
import { User } from '../types';
//import bcrypt from 'bcryptjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  username: string;
  name: string;
  id: Int16Array;
}

export const login = async ({ email, password }: LoginCredentials): Promise<User> => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new Error('Invalid credentials');
  }

  // Directly compare the provided password with the stored password
  if (password !== user.password) {
    throw new Error('Invalid credentials');
  }

  return user;
};

export const signup = async (userData: SignupData): Promise<void> => {
  const { email, password, username, name, id } = userData;

  // Check if the email already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Insert the new user data into the users table
  const { error } = await supabase.from('users').insert([
    {
      email,
      password,
      username,
      name,
      id, 
    },
  ]);

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
};
