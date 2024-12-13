import React from 'react';
import { useFacilityStore } from '../store/facilityStore';
import { FacilityCard } from '../components/FacilityCard';

export const Facilities: React.FC = () => {
  const facilities = useFacilityStore((state) => state.facilities);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sports Facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>
    </div>
  );
};