import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotPickerProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
        Time Slot
      </label>
      <div className="mt-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
        <select
          id="time"
          name="time"
          required
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select a time</option>
          {Array.from({ length: 14 }, (_, i) => i + 8).map((hour) => (
            <option key={hour} value={`${hour}:00`}>
              {`${hour}:00`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};