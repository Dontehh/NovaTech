import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Facility } from '../types';

interface FacilityCardProps {
  facility: Facility;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => navigate(`/facilities/${facility.id}`)}
    >
      <img 
        src={facility.image} 
        alt={facility.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{facility.name}</h3>
        <p className="text-gray-600 mb-4">{facility.description}</p>
        <div className="flex items-center text-gray-700">
          <Clock className="w-4 h-4 mr-1" />
          <span>Available for booking</span>
        </div>
      </div>
    </div>
  );
};