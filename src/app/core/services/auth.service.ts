import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseError } from '@firebase/util';

import { of, Observable, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import {
  AuthError,
  AuthUserCredential,
  Collections,
  FirebaseUser,
  FirebaseUserInfo,
  FirestoreCollectionReference,
  generateAvatar,
  googleAuthProvider,
  User
} from 'src/app/shared';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) { }

  getFirebaseUser(): Observable<FirebaseUser> {
    return this.afauth.authState;
  }

  getCurrentUser(): Observable<User> {
    return this.afauth.authState
      .pipe(
        switchMap((firebaseUser: FirebaseUser) => {
          if (!firebaseUser) return of(null);
          return this.afs.collection<User>(Collections.Users, (ref: FirestoreCollectionReference) => ref
            .where('email', '==', firebaseUser.email))
            .valueChanges()
            .pipe(
              map((users: User[]) => {
                return {
                  ...users[0],
                  emailVerified: firebaseUser.emailVerified,
                };
              }),
            );
        }),
      );
  }

  login({ email, password }: User): Observable<FirebaseUser> {
    return from(this.afauth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((userCredential: AuthUserCredential) => {
          const { user } = userCredential;

          if (user.emailVerified) {
            return of(user);
          }
          throw new FirebaseError('INACTIVE', 'Your Account is inactive.');
        }),
        catchError((err: AuthError) => this.notificationService.handleError(err))
      );
  }

  loginWithGoole(): Observable<FirebaseUserInfo> {
    return from(this.afauth.signInWithPopup(googleAuthProvider()))
      .pipe(
        switchMap(({ user }: AuthUserCredential) => this.update(user)),
        catchError((err: AuthError) => this.notificationService.handleError(err))
      );
  }

  logout(): Observable<void> {
    return from(this.afauth.signOut())
      .pipe(catchError((err: AuthError) => this.notificationService.handleError(err)));
  }

  register({ displayName, email, password }: User): Observable<FirebaseUserInfo> {
    let userData: FirebaseUserInfo;

    return from(this.afauth.createUserWithEmailAndPassword(email, password))
      .pipe(
        switchMap((userCredential: AuthUserCredential) => {
          const { user } = userCredential;
          userData = user;
          user.sendEmailVerification();
          return from(user.updateProfile({ displayName, photoURL: generateAvatar(user.uid) }))
        }),
        switchMap(() => this.update(userData)),
        catchError((err: AuthError) => this.notificationService.handleError(err))
      )
  }

  update(user: FirebaseUserInfo): Observable<FirebaseUserInfo> {
    const { displayName, email, photoURL, uid } = user;

    return this.afs.doc(`${Collections.Users}/${uid}`).get()
      .pipe(
        switchMap(snapshot => from(this.afs.doc(`${Collections.Users}/${uid}`)[snapshot.exists ? 'update' : 'set']({ displayName, email, photoURL, uid }))),
        switchMap(() => of(user)),
      );
  }
}
