import supabase from '../config/supabaseClient';
import { Facility } from '../types';

export const getFacilities = async (): Promise<Facility[]> => {
  const { data, error } = await supabase
    .from('facilities')
    .select('*');

  if (error) throw error;
  return data || [];
};

export const getFacilityById = async (id: string): Promise<Facility | null> => {
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getAvailableTimeSlots = async (
  facilityId: string,
  date: string
): Promise<string[]> => {
  // Get all possible time slots
  const allTimeSlots = Array.from({ length: 12 }, (_, i) => `${i + 11}:00`);

  // Get booked slots
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('time_slot')
    .eq('facility_id', facilityId)
    .eq('date', date);

  if (error) throw error;

  // Filter out booked slots
  const bookedSlots = new Set(bookings?.map(b => b.time_slot) || []);
  return allTimeSlots.filter(slot => !bookedSlots.has(slot));
};