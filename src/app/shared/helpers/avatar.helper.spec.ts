import md5 from 'md5';
import { generateAvatar } from './avatar.helper';

describe('generateAvatar', () => {
  const id = '12345';

  it('should return correct url', () => {
    expect(generateAvatar(id)).toBe(`http://gravatar.com/avatar/${md5(id)}?d=identicon`);
  });
});
