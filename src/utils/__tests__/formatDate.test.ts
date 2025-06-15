import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2025-01-15T10:30:00Z');
    const formatted = formatDate(date);
    expect(formatted).toMatch(/Jan 15, 2025/);
  });

  it('should handle invalid dates', () => {
    const invalidDate = new Date('invalid');
    const formatted = formatDate(invalidDate);
    expect(formatted).toBe('Invalid date');
  });
});