import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User, Collections, b64toBlob, AuthError, FirebaseUser } from 'src/app/shared';

import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: CoreModule
})
export class UserProfileService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  update(user: User, photo: string): Observable<User> {
    const obs$ = () => photo ? this.uploadPhoto(user, photo) : of(null);

    return obs$().pipe(
      switchMap((photoURL: string) => this.updateProfile(user, photoURL || user.photoURL)),
      switchMap((photoURL: string) => of({ ...user, photoURL })),
      catchError((err: AuthError) => this.notificationService.handleError(err))
    );
  }

  getById(uid: string): Observable<User> {
    if (!uid) { return of(null); }

    return <Observable<User>>this.afs.collection(Collections.Users).doc(uid).valueChanges().pipe(
      switchMap((user: DocumentSnapshot<User>) => of(user)),
      catchError((err: AuthError) => this.notificationService.handleError(err))
    );
  }

  private updateProfile(user: User, photoURL: string): Observable<string> {
    const { uid, displayName } = user;

    return this.authService.getCurrentUser()
      .pipe(
        switchMap((firebaseUser: FirebaseUser) => from(firebaseUser.updateProfile({ displayName, photoURL }))),
        switchMap(() => this.afs.doc(`${Collections.Users}/${uid}`).update({ displayName, photoURL })),
        switchMap(() => of(photoURL)),
        catchError((err: AuthError) => this.notificationService.handleError(err))
      );
  }

  private uploadPhoto(user: User, photo: string): Observable<string> {
    return from(this.storage.upload(`users/${user.uid}/${Date.now()}`, b64toBlob(photo)))
      .pipe(
        switchMap((data: UploadTaskSnapshot) => data.ref.getDownloadURL()),
        catchError((err: AuthError) => this.notificationService.handleError(err))
      );
  }
}
