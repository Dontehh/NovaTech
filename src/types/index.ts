// ... existing types ...

export interface Booking {
  booking_id: number;
  facility_id: string;
  user_id: string;
  date: string;
  time_slot: string;
}

// Update User interface
export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  created_at: string;
}