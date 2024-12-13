import { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useAuthStore } from '../store/authStore';
import { LoginCredentials, SignupData } from '../services/auth';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser, setAuthenticated } = useAuthStore();

  const handleLogin = async ({ email, password }: LoginCredentials) => {
    setError(null);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) {
        setUser(data.user);
        setAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async ({ email, password, ...profile }: SignupData) => {
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: profile
        }
      });

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAuthenticated(false);
  };

  const handleForgotPassword = async (email: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset instructions');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (email: string, token: string) => {
    setError(null);
    setLoading(true);
    console.log('Verifying OTP:', { email, token });
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'recovery'
      });
      console.log('Supabase response:', { data, error });

      if (error) throw error;
      if (data.user) {
        setUser(data.user);
        setAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err instanceof Error ? err.message : 'Invalid OTP');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        email,
        password
      });

      if (error) throw error;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    forgotPassword: handleForgotPassword,
    verifyOtp: handleVerifyOtp,
    resetPassword: handleResetPassword,
  };
};