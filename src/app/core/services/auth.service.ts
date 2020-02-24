import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseError } from '@firebase/util';

import { of, throwError, Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import { Collections, generateAvatar, User } from 'src/app/shared';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private notificationService: NotificationService
  ) { }

  onAuthStateChange() {
    return this.afauth.authState;
  }

  login({ email, password }: User): Observable<firebase.User> {
    return from(this.afauth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((userCredential: firebase.auth.UserCredential) => {
          const { user } = userCredential;

          if (user.emailVerified) {
            return of(user);
          }
          throw new FirebaseError('INACTIVE', 'Your Account is inactive.');
        }),
        catchError((err: firebase.auth.Error) => this.handleError(err))
      );
  }

  loginWithGoole(): Observable<firebase.UserInfo> {
    return from(this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
      .pipe(
        switchMap(({ user }: firebase.auth.UserCredential) => this.update(user)),
        catchError((err: firebase.auth.Error) => this.handleError(err))
      );
  }

  register({ displayName, email, password }: User): Observable<firebase.UserInfo> {
    let userData: firebase.UserInfo;

    return from(this.afauth.auth.createUserWithEmailAndPassword(email, password))
      .pipe(
        switchMap((userCredential: firebase.auth.UserCredential) => {
          const { user } = userCredential;
          userData = user;
          user.sendEmailVerification();
          return from(user.updateProfile({ displayName, photoURL: generateAvatar(user.uid) }))
        }),
        switchMap(() => this.update(userData)),
        catchError((err: firebase.auth.Error) => this.handleError(err))
      )
  }

  update(user: firebase.UserInfo): Observable<firebase.UserInfo> {
    const { displayName, email, photoURL, uid } = user;

    return from(this.afs.doc(`${Collections.Users}/${uid}`).set({ displayName, email, photoURL }))
      .pipe(switchMap(() => of(user)));
  }

  private handleError(err: firebase.auth.Error) {
    this.notificationService.show(err.message);
    return throwError(err);
  }
}