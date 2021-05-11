import { user } from 'src/app/mock';
import * as authSelectors from './auth.selectors';
import { initialAuthState } from './auth.state';

describe('AuthSelectors', () => {
  describe('authSubmitSelector', () => {
    it('should return correct value', () => {
      expect(authSelectors.authSubmitSelector.projector({ ...initialAuthState, loading: true })).toBe(true);
    });
  });

  describe('authUserSelector', () => {
    it('should return correct value', () => {
      expect(authSelectors.authUserSelector.projector({ ...initialAuthState, user })).toEqual(user);
    });
  });

  describe('authAuthorizeDataSelector', () => {
    it('should return correct value', () => {
      expect(authSelectors.authAuthorizeDataSelector.projector({ ...initialAuthState, authorizeData: user })).toEqual(user);
    });
  });
});
