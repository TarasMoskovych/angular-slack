import { b64Data } from '@angular-slack/app/mocks';
import { b64toBlob } from './converters.helper';

describe('converters', () => {
  describe('b64toBlob', () => {
    it('should return correct blob object', () => {
      const result = b64toBlob(b64Data);

      expect(result.type).toBe('image/png');
      expect(result.size).toBe(85);
    });
  });
});
