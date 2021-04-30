import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, take, map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User, Collections, b64toBlob, AuthError, FirebaseUser } from 'src/app/shared';

import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { authUserSelector } from 'src/app/+store/auth/auth.selectors';

@Injectable({
  providedIn: CoreModule
})
export class UserProfileService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private notificationService: NotificationService,
    private store: Store,
  ) { }

  update(user: User, photo: string): Observable<User> {
    const obs$ = () => photo ? this.uploadPhoto(user, photo) : of(null);

    return obs$().pipe(
      switchMap((photoURL: string) => this.updateProfile(user, photoURL || user.photoURL)),
      switchMap((photoURL: string) => of({ ...user, photoURL })),
      catchError((err: AuthError) => this.notificationService.handleError(err))
    );
  }

  starChannel(channel: { [key: string]: boolean }): Observable<any> {
    return this.store.select(authUserSelector)
      .pipe(
        take(1),
        map((user: User) => {
          const starredChannels = this.getStarredChannels(user, channel);

          if (starredChannels.length === user.starredChannels?.length) return of(null);
          return this.afs.doc(`${Collections.Users}/${user.uid}`).update({ starredChannels: this.getStarredChannels(user, channel) });
        }),
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

    return this.authService.getFirebaseUser()
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

  private getStarredChannels(user: User, channelObj: { [key: string]: boolean }): string[] {
    const channelId = Object.keys(channelObj)[0];
    const channels = user.starredChannels || [];

    if (channelObj[channelId]) {
      return [...new Set([...channels, channelId])];
    }

    return channels.filter((id: string) => id !== channelId);
  }
}
