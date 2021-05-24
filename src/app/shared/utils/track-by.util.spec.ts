import { TrackByUtil } from './track-by.util';

class Base extends TrackByUtil<any> {}

describe('TrackByUtil', () => {
  const base = new Base();
  const index = 5;

  it('should have public "trackByFn" method', () => {
    expect(base.trackByFn).toBeDefined();
  });

  it('should return id if it exists', () => {
    const id = 'f5a1e6fd';
    expect(base.trackByFn(index, { id })).toBe(id);
  });

  it('should return index if id does not exist or falsy', () => {
    expect(base.trackByFn(index, { id: null })).toBe(index);
  });
});
