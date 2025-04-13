import { truncateAddress } from '../../utils/address';

describe('Address Utilities', () => {
  describe('truncateAddress', () => {
    test('should truncate address to first 4 and last 4 characters by default', () => {
      const result = truncateAddress('0x1234567890abcdef');
      expect(result).toBe('0x123456...90abcdef');
    });

    test('should handle short addresses without truncation', () => {
      const result = truncateAddress('0x1234');
      expect(result).toBe('0x1234');
    });

    test('should handle empty string', () => {
      const result = truncateAddress('');
      expect(result).toBe('');
    });

    test('should handle custom start length', () => {
      const result = truncateAddress('0x1234567890abcdef', 6);
      expect(result).toBe('0x1234...90abcdef');
    });

    test('should handle custom end length', () => {
      const result = truncateAddress('0x1234567890abcdef', 4, 6);
      expect(result).toBe('0x12...abcdef');
    });
  });
});
