import { error, user } from 'src/app/mocks';
import * as UserProfileActions from './user-profile.actions';

describe('UserProfileActions', () => {
  describe('initProfile', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.initProfile();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Init Profile');
    });
  });

  describe('starChannel', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.starChannel({ channel: { 12345678: true } });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Star Channel');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual({ 12345678: true });
    });
  });

  describe('updateProfile', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.updateProfile({ payload: { photoURL: 'url', user } });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Update Profile');
    });

    it('should have correct payload', () => {
      expect(result.payload).toEqual({ photoURL: 'url', user });
    });
  });

  describe('updateProfileSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.updateProfileSuccess({ user });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Update Profile Success');
    });

    it('should have correct payload', () => {
      expect(result.user).toEqual(user);
    });
  });

  describe('updateProfileError', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.updateProfileError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Update Profile Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('loadPhotoPreview', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.loadPhotoPreview();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Load Photo Preview');
    });
  });

  describe('loadPhotoPreviewSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.loadPhotoPreviewSuccess({ photo: 'test.jpg' });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Load Photo Preview Success');
    });

    it('should have correct payload', () => {
      expect(result.photo).toEqual('test.jpg');
    });
  });

  describe('clearPhotoPreview', () => {
    let result: any;

    beforeAll(() => {
      result = UserProfileActions.clearPhotoPreview();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[User Profile] Clear Photo Preview');
    });
  });
});
