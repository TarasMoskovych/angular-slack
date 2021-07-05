import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';

import { UserProfileService } from '@angular-slack/app/core';
import { mockNotificationService, error, user } from '@angular-slack/app/mocks';
import * as userProfileActions from './user-profile.actions';
import { UserProfileEffects } from './user-profile.effects';

describe('UserProfileEffects', () => {
  const notificationServiceSpy = mockNotificationService();
  const userServiceSpy: jasmine.SpyObj<UserProfileService> = jasmine.createSpyObj('UserProfileService', ['update', 'starChannel']);

  describe('update$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: userProfileActions.updateProfile.type,
        payload: {
          user,
          photoURL: 'url',
        },
      }));
    });

    it('should return correct data when success', () => {
      userServiceSpy.update.and.returnValue(of(user));
      const effects = new UserProfileEffects(actions$, notificationServiceSpy, userServiceSpy);

      effects.update$.subscribe((action: any) => {
        expect(action.type).toBe(userProfileActions.updateProfileSuccess.type);
        expect(action.user).toEqual(user);
      });
    });

    it('should return correct data when error', () => {
      userServiceSpy.update.and.returnValue(throwError(error));
      const effects = new UserProfileEffects(actions$, notificationServiceSpy, userServiceSpy);

      effects.update$.subscribe((action: any) => {
        expect(action.type).toBe(userProfileActions.updateProfileError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('updateSuccess$', () => {
    let actions$: Actions;
    let effects: UserProfileEffects;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: userProfileActions.updateProfileSuccess.type,
        user,
      }));

      effects = new UserProfileEffects(actions$, notificationServiceSpy, userServiceSpy);
    });

    it('should return correct type and call show', () => {
      effects.updateSuccess$.subscribe((action: any) => {
        expect(action.type).toBe('[Auth] State Change Success');
        expect(notificationServiceSpy.show).toHaveBeenCalledOnceWith('User profile was updated.');
      });
    });
  });

  describe('starChannel$', () => {
    let actions$: Actions;
    let effects: UserProfileEffects;

    beforeAll(() => {
      userServiceSpy.starChannel.and.returnValue(of(undefined));
      actions$ = new Actions(of({
        type: userProfileActions.starChannel.type,
        channel: { 1234: false },
      }));

      effects = new UserProfileEffects(actions$, notificationServiceSpy, userServiceSpy);
    });

    it('should call starChannel', () => {
      effects.starChannel$.subscribe(() => {
        expect(userServiceSpy.starChannel).toHaveBeenCalledOnceWith({ 1234: false });
      });
    });
  });
});
