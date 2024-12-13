import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';

export const Navigation: React.FC = () => {
  const { logout } = useAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            NovaFit
          </Link>
          
          <div className="flex space-x-4">
            <Link to="/facilities" className="text-gray-600 hover:text-gray-900">
              Facilities
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <User className="w-4 h-4 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};