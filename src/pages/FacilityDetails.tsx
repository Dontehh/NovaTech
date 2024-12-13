import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useFacilityStore } from '../store/facilityStore';
import { BookingForm } from '../components/BookingForm';

export const FacilityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const facility = useFacilityStore((state) => 
    state.facilities.find((f) => f.id === id)
  );

  if (!facility) {
    return <div>Facility not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/facilities')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Facilities
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{facility.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{facility.description}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Book this facility</h2>
          <BookingForm facility={facility} />
        </div>
      </div>
    </div>
  );
};