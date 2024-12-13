import { describe, it, expect } from 'vitest';
import { checkPasswordStrength, isPasswordValid } from './passwordStrength';

describe('Password Strength Checker', () => {
  it('should validate password requirements correctly', () => {
    expect(isPasswordValid('weak')).toBe(false);
    expect(isPasswordValid('Password123!')).toBe(true);
    expect(isPasswordValid('12345678')).toBe(false);
    expect(isPasswordValid('password')).toBe(false);
    expect(isPasswordValid('Password!')).toBe(false);
  });

  it('should check password strength', () => {
    const weakPassword = checkPasswordStrength('password123');
    expect(weakPassword.score).toBeLessThan(3);

    const strongPassword = checkPasswordStrength('StrongP@ssw0rd2024!');
    expect(strongPassword.score).toBeGreaterThan(3);
  });
});