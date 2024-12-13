import supabase from '../config/supabaseClient';
import { Booking } from '../types';

export const createBooking = async (booking: Omit<Booking, 'booking_id'>): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .insert([booking]);

  if (error) {
    throw error;
  }
};

export const checkAvailability = async (
  facilityId: string,
  date: string,
  timeSlot: string
): Promise<boolean> => {
  const { data: existingBooking } = await supabase
    .from('bookings')
    .select('*')
    .eq('facility_id', facilityId)
    .eq('date', date)
    .eq('time_slot', timeSlot)
    .single();

  return !existingBooking;  // Return true if slot is available
};