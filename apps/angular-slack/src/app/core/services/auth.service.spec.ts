import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import firebase from 'firebase/app';

import {
  error,
  firebaseUser,
  mockFireAuth,
  mockFireStore,
  mockNotificationService,
  spyOnCollection,
  spyOnDoc,
  user,
  userCredential,
  userInfo,
} from '@angular-slack/app/mocks';
import { AuthError, Collections, FirebaseUser, FirebaseUserInfo, User } from '@angular-slack/app/shared';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

describe('AuthService', () => {
  let service: AuthService;
  let fireAuth: jasmine.SpyObj<AngularFireAuth>;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    fireAuth = mockFireAuth();
    fireStore = mockFireStore();
    notificationService = mockNotificationService();
    service = new AuthService(fireAuth, fireStore, notificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFirebaseUser', () => {
    it('should return firebase user', () => {
      service.getFirebaseUser().subscribe((u: FirebaseUser) => {
        expect(u).toEqual(firebaseUser);
      });
    });
  });

  describe('getCurrentUser', () => {
    it('should return null', () => {
      spyOn(service, 'getFirebaseUser').and.returnValue(of(undefined));

      service.getCurrentUser().subscribe((value: User) => {
        expect(value).toBeNull();
      });
    });

    it('should return user', () => {
      spyOn(service, 'getFirebaseUser').and.returnValue(of(firebaseUser));
      spyOnCollection(fireStore, [user], Collections.Users);

      service.getCurrentUser().subscribe((value: User) => {
        expect(value).toEqual({ ...user, emailVerified: firebaseUser.emailVerified });
      });
    });
  });

  describe('login', () => {
    it('should return user if his email is verified', (done: DoneFn) => {
      const response = { ...user, emailVerified: true };
      fireAuth.signInWithEmailAndPassword.and.resolveTo({ ...userCredential, user: response as FirebaseUser });

      service.login(user).subscribe((data: User) => {
        expect(data).toEqual(response);
        done();
      });
    });

    it('should throw an error if user email is not verified', (done: DoneFn) => {
      const response = { ...user, emailVerified: false };
      fireAuth.signInWithEmailAndPassword.and.resolveTo({ ...userCredential, user: response as FirebaseUser });

      service.login(user).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('loginWithGoogle', () => {
    beforeEach(() => {
      spyOn(service, 'update').and.returnValue(of(userInfo));
      if (!firebase?.auth?.GoogleAuthProvider) {
        firebase.auth = { GoogleAuthProvider: class GoogleAuthProvider {} } as any;
      }
    });

    it('should authorize user and call update method', (done: DoneFn) => {
      fireAuth.signInWithPopup.and.resolveTo(userCredential);

      service.loginWithGoogle().subscribe((response: FirebaseUserInfo) => {
        expect(response).toEqual(userInfo);
        expect(service.update).toHaveBeenCalledOnceWith(userCredential.user);
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      fireAuth.signInWithPopup.and.rejectWith(error);

      service.loginWithGoogle().subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('logout', () => {
    it('should call signOut', (done: DoneFn) => {
      fireAuth.signOut.and.resolveTo();

      service.logout().subscribe(() => {
        expect(fireAuth.signOut).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      fireAuth.signOut.and.rejectWith(error);

      service.logout().subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('register', () => {
    beforeEach(() => {
      spyOn(service, 'update').and.returnValue(of(userInfo));
    });

    it('should register a new user and return user info', (done: DoneFn) => {
      fireAuth.createUserWithEmailAndPassword.and.resolveTo(userCredential);

      service.register(user).subscribe((response: FirebaseUserInfo) => {
        expect(response).toEqual(userInfo);
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      fireAuth.createUserWithEmailAndPassword.and.rejectWith(error);

      service.register(user).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('update', () => {
    it('should create a new user and return user info', (done: DoneFn) => {
      spyOnDoc(fireStore, false);

      service.update(userInfo).subscribe((response: FirebaseUserInfo) => {
        expect(response).toEqual(userInfo);
        done();
      });
    });

    it('should update existing new user and return user info', (done: DoneFn) => {
      spyOnDoc(fireStore, true);

      service.update(userInfo).subscribe((response: FirebaseUserInfo) => {
        expect(response).toEqual(userInfo);
        done();
      });
    });
  });
});
