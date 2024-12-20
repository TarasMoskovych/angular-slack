import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';

import { AppState } from '@angular-slack/app/+store';
import {
  error,
  firebaseUser,
  mockAuthService,
  mockFireStore,
  mockNotificationService,
  mockStorageService,
  mockStore,
  photoURL,
  spyOnCollection,
  spyOnDoc,
  user,
} from '@angular-slack/app/mocks';
import { AuthError } from '@angular-slack/app/shared';
import { Collections, User } from '@libs/models';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';
import { UserProfileService } from './user-profile.service';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let authService: jasmine.SpyObj<AuthService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    fireStore = mockFireStore();
    authService = mockAuthService();
    storageService = mockStorageService();
    notificationService = mockNotificationService();
    store = mockStore();
    service = new UserProfileService(fireStore, authService, storageService, notificationService, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('update', () => {
    beforeEach(() => {
      spyOnDoc(fireStore, true);
      firebaseUser.updateProfile.and.resolveTo();
    });

    it('should return updated user without uploading new photo', (done: DoneFn) => {
      authService.getFirebaseUser.and.returnValue(of(firebaseUser));

      service.update(user, null).subscribe((response: User) => {
        expect(response.displayName).toEqual(user.displayName);
        done();
      });
    });

    it('should return updated user with uploading a new photo', (done: DoneFn) => {
      authService.getFirebaseUser.and.returnValue(of(firebaseUser));
      storageService.uploadPhoto.and.returnValue(of(photoURL));

      service.update(user, photoURL).subscribe((response: User) => {
        expect(response.photoURL).toEqual(photoURL);
        done();
      });
    });

    it('should handle an error when user is not defined', (done: DoneFn) => {
      authService.getFirebaseUser.and.returnValue(throwError(error));

      service.update(user, null).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });

    it('should handle an error when upload is rejected', (done: DoneFn) => {
      authService.getFirebaseUser.and.returnValue(of(firebaseUser));
      storageService.uploadPhoto.and.returnValue(throwError(error));

      service.update(user, photoURL).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('starChannel', () => {
    beforeEach(() => {
      spyOnDoc(fireStore, true);
      store.select.and.returnValue(of(user));
    });

    it('should update starred channels and return empty array', (done: DoneFn) => {
      service.starChannel({ [user.starredChannels[0]]: false }).subscribe(async(data: { starredChannels: string[] }) => {
        const result = await data;

        expect(result.starredChannels).toEqual([]);
        expect(fireStore.doc).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should update starred channels when user does not have any starred channels', (done: DoneFn) => {
      store.select.and.returnValue(of({...user, starredChannels: null }));

      service.starChannel({ [user.starredChannels[0]]: false }).subscribe(async(data: { starredChannels: string[] }) => {
        const result = await data;

        expect(result.starredChannels).toEqual([]);
        expect(fireStore.doc).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should update starred channels and return array with 2 items', (done: DoneFn) => {
      service.starChannel({ 1234: true }).subscribe(async(data: { starredChannels: string[] }) => {
        const result = await data;

        expect(result.starredChannels.length).toBe(2);
        expect(fireStore.doc).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should return null and do not call update when starring a channel that has already starred', (done: DoneFn) => {
      service.starChannel({ [user.starredChannels[0]]: true }).subscribe((response: unknown) => {
        expect(response).toBeNull();
        expect(fireStore.doc).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('getById', () => {
    it('should return null if uid is falsy', (done: DoneFn) => {
      service.getById(null).subscribe((response: User) => {
        expect(response).toBeNull();
        done();
      });
    });

    it('should return user', (done: DoneFn) => {
      spyOnCollection(fireStore, user, Collections.Users);

      service.getById(user.uid).subscribe((response: User) => {
        expect(response).toEqual(user);
        done();
      });
    });

    it('should handle an error when user is not defined', (done: DoneFn) => {
      spyOnCollection(fireStore, user, Collections.Users, true);

      service.getById(user.uid).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });
});
