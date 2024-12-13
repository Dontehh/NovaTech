import { useState } from 'react';
import { createBooking, checkAvailability } from '../services/bookings';
import { getAvailableTimeSlots } from '../services/facilities';
import { useAuthStore } from '../store/authStore';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const user = useAuthStore((state) => state.user);

  const fetchAvailableSlots = async (facilityId: string, date: string) => {
    try {
      const slots = await getAvailableTimeSlots(facilityId, date);
      setAvailableSlots(slots);
    } catch (err) {
      setError('Failed to fetch available time slots');
    }
  };

  const book = async (facilityId: string, date: string, timeSlot: string) => {
    if (!user) {
      setError('You must be logged in to book');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const isAvailable = await checkAvailability(facilityId, date, timeSlot);
      if (!isAvailable) {
        setError('This time slot is no longer available');
        return false;
      }
      
      await createBooking({
        facility_id: facilityId, // string
        user_id: user.id, 
        date: date, // string (YYYY-MM-DD)
        time_slot: timeSlot, // string (e.g., "10:00 - 11:00")
      });

      return true;
    } catch (err) {
      setError('Failed to create booking');
      console.log({err});
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    book,
    loading,
    error,
    availableSlots,
    fetchAvailableSlots,
  };
};


export default useBooking;