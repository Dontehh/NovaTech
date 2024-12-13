import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { TimeSlotPicker } from './TimeSlotPicker';
import { Facility } from '../types';
//import { supabase } from '../lib/supabase';
import {useBooking} from '../hooks/useBooking';
import { useAuthStore } from '../store/authStore';

interface BookingFormProps {
  facility: Facility;
}

export const BookingForm: React.FC<BookingFormProps> = ({ facility }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const user = useAuthStore((state) => state.user);
  const {book, loading, error} = useBooking();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
    //   // Check if slot is available
    //   const { data: existingBooking } = await supabase
    //     .from('bookings')
    //     .select('*')
    //     .eq('facility_id', facility.id)
    //     .eq('date', date)
    //     .eq('time_slot', time)
    //     .single();

    //   if (existingBooking) {
    //     throw new Error('This time slot is already booked');
    //   }

    //   // Create booking
    //   const { error } = await supabase.from('bookings').insert([
    //     {
    //       facility_id: facility.id,
    //       user_id: user.id,
    //       date,
    //       time_slot: time,
    //     },
    //   ]);

    //   if (error) throw error;
    //   setStatus('success');
    // } catch (error) {
    //   setStatus('error');
    // }
      const success = await book(facility.id, date, time);
      if(success){
        setStatus('success');
      }else{
        setStatus('error');
      }
    }catch(error){
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DatePicker value={date} onChange={setDate} />
      <TimeSlotPicker value={time} onChange={setTime} />

      {status === 'error' && (
        <p className="text-sm text-red-600">
          {!user ? 'Please log in to book facilities' : 'Failed to book. Please try again.'}
        </p>
      )}
      {status === 'success' && (
        <p className="text-sm text-green-600">Booking confirmed successfully!</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !user}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Processing...' : 'Book Now'}
      </button>
    </form>
  );
};