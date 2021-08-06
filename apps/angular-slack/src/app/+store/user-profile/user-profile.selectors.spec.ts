import * as userProfileSelectors from './user-profile.selectors';
import { initialUserProfileState } from './user-profile.state';

describe('UserProfileSelectors', () => {
  describe('userProfilePhotoPreviewSelector', () => {
    it('should return correct value', () => {
      expect(userProfileSelectors.userProfilePhotoPreviewSelector.projector({ ...initialUserProfileState, photoURL: 'test-url' })).toBe('test-url');
    });
  });

  describe('getLoading', () => {
    it('should return correct value', () => {
      expect(userProfileSelectors.userProfileLoadingSelector.projector({ ...initialUserProfileState, loading: true })).toBe(true);
    });
  });

  describe('userProfileUpdatedSelector', () => {
    it('should return correct value', () => {
      expect(userProfileSelectors.userProfileUpdatedSelector
        .projector({ ...initialUserProfileState })).toBe(initialUserProfileState.updated);
    });
  });
});
