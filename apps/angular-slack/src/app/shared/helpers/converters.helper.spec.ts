import { b64toBlob } from './converters.helper';

describe('converters', () => {
  describe('b64toBlob', () => {
    it('should return correct blob object', () => {
      const result = b64toBlob('iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==');

      expect(result.type).toBe('image/png');
      expect(result.size).toBe(85);
    });
  });
});
