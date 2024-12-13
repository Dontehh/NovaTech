import React from 'react';
import { checkPasswordStrength, getPasswordFeedback } from '../utils/passwordStrength';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const strength = checkPasswordStrength(password);
  const feedback = getPasswordFeedback(password);
  
  const strengthColors = [
    'bg-red-500',    // Very Weak
    'bg-orange-500', // Weak
    'bg-yellow-500', // Fair
    'bg-green-500',  // Strong
    'bg-green-600'   // Very Strong
  ];

  const strengthLabels = [
    'Very Weak',
    'Weak',
    'Fair',
    'Strong',
    'Very Strong'
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors ${
              i <= strength.score ? strengthColors[strength.score] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      
      {password && (
        <div className="text-sm text-gray-600 mt-1">
          Strength: {strengthLabels[strength.score]}
        </div>
      )}

      {feedback.length > 0 && (
        <ul className="mt-2 space-y-1">
          {feedback.map((item, index) => (
            <li key={index} className="text-sm text-gray-500">
              • {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};