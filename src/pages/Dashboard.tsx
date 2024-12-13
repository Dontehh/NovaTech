import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { Calendar, Clock } from 'lucide-react';

interface Booking {
  id: string;
  facility_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  facility: {
    name: string;
  };
}

interface Facility {
  id: string;
  name: string;
  available_hours: string[];
  booked_hours: string[];
}

const Dashboard: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch facilities and their availability
        const { data: facilitiesData, error: facilitiesError } = await supabase
          .from('facilities')
          .select('*');

        if (facilitiesError) throw facilitiesError;

        // Fetch user's bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            facility:facilities(name)
          `)
          .eq('user_id', user?.id)
          .order('start_time', { ascending: false });

        if (bookingsError) throw bookingsError;

        // Process facilities data to include availability
        const processedFacilities = facilitiesData.map((facility) => {
          const facilityBookings = bookingsData.filter(
            (booking) => booking.facility_id === facility.id
          );
          
          const bookedHours = facilityBookings.map((booking) => ({
            start: new Date(booking.start_time).getHours(),
            end: new Date(booking.end_time).getHours(),
          }));

          // Assuming facility is open from 8 AM to 10 PM
          const availableHours = [];
          for (let hour = 8; hour <= 22; hour++) {
            const isBooked = bookedHours.some(
              (booking) => hour >= booking.start && hour < booking.end
            );
            if (!isBooked) {
              availableHours.push(`${hour}:00`);
            }
          }

          return {
            ...facility,
            available_hours: availableHours,
            booked_hours: bookedHours,
          };
        });

        setFacilities(processedFacilities);
        setUserBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* User Bookings Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {userBookings.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {userBookings.map((booking) => (
                <div key={booking.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {booking.facility.name}
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(booking.start_time).toLocaleDateString()}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(booking.start_time).toLocaleTimeString()} -{' '}
                        {new Date(booking.end_time).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              You haven't made any bookings yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 