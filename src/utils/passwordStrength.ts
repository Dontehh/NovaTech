import zxcvbn from 'zxcvbn';

export interface PasswordStrength {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const result = zxcvbn(password);
  return {
    score: result.score,
    feedback: result.feedback,
  };
};

export const isPasswordValid = (password: string): boolean => {
  // Basic requirements
  const minLength = 8;
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check basic requirements
  const meetsBasicRequirements = 
    password.length >= minLength &&
    hasNumber &&
    (hasUpperCase || hasLowerCase); // Require at least one letter (upper or lower)

  // Check password strength using zxcvbn
  const strength = checkPasswordStrength(password);
  const isStrongEnough = strength.score >= 2; // Score of 2 or higher is considered acceptable

  return meetsBasicRequirements && isStrongEnough;
};

export const getPasswordFeedback = (password: string): string[] => {
  const feedback: string[] = [];
  
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  }
  if (!/\d/.test(password)) {
    feedback.push('Include at least one number');
  }
  if (!/[A-Z]/.test(password) && !/[a-z]/.test(password)) {
    feedback.push('Include at least one letter');
  }
  
  const strength = checkPasswordStrength(password);
  if (strength.feedback.warning) {
    feedback.push(strength.feedback.warning);
  }
  feedback.push(...strength.feedback.suggestions);
  
  return feedback;
};