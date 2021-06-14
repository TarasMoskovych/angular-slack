import { error, user } from '@angular-slack/app/mocks';
import * as userProfileActions from './user-profile.actions';
import { userProfileReducer } from './user-profile.reducer';
import { initialUserProfileState } from './user-profile.state';

describe('UserProfileReducer', () => {
  describe('default', () => {
    it('should return default state', () => {
      const state = userProfileReducer(undefined, {} as any);
      expect(state).toBe(initialUserProfileState);
    });
  });

  describe('initProfile', () => {
    it('should return correct state', () => {
      const state = userProfileReducer(initialUserProfileState, userProfileActions.initProfile());
      expect(state).toEqual({ ...initialUserProfileState, updated: false, photoURL: null });
    });
  });

  describe('updateProfile', () => {
    it('should return correct state', () => {
      const state = userProfileReducer(initialUserProfileState, userProfileActions.updateProfile({ payload: { photoURL: 'test', user } }));
      expect(state).toEqual({ ...initialUserProfileState, updated: false, loading: true });
    });
  });

  describe('updateProfileSuccess', () => {
    it('should return correct state', () => {
      const state = userProfileReducer(initialUserProfileState, userProfileActions.updateProfileSuccess({ user }));
      expect(state).toEqual({ ...initialUserProfileState, updated: true, loading: false });
    });
  });

  describe('updateProfileError', () => {
    it('should return correct state', () => {
      const state = userProfileReducer(initialUserProfileState, userProfileActions.updateProfileError({ error }));
      expect(state).toEqual({ ...initialUserProfileState, loading: false });
    });
  });

  describe('loadPhotoPreview', () => {
    it('should return correct state', () => {
      const state = userProfileReducer(initialUserProfileState, userProfileActions.loadPhotoPreview());
      expect(state).toEqual({ ...initialUserProfileState, loading: true });
    });
  });

  describe('loadPhotoPreviewSuccess', () => {
    it('should return correct state', () => {
      const state = userProfileReducer(initialUserProfileState, userProfileActions.loadPhotoPreviewSuccess({ photo: 'photo.jpg' }));
      expect(state).toEqual({ ...initialUserProfileState, loading: false, photoURL: 'photo.jpg' });
    });
  });

  describe('clearPhotoPreview', () => {
    it('should return correct state', () => {
      const state = userProfileReducer(initialUserProfileState, userProfileActions.clearPhotoPreview());
      expect(state).toEqual({ ...initialUserProfileState, loading: false, photoURL: null });
    });
  });
});
