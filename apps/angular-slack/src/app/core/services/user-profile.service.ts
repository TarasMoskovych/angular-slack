import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';

import { Observable, from, of } from 'rxjs';
import { switchMap, catchError, take, map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User, AuthError, FirebaseUser } from '@angular-slack/app/shared';
import { Collections } from '@libs/models';

import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { authUserSelector } from '@angular-slack/app/+store/auth/auth.selectors';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: CoreModule
})
export class UserProfileService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private store: Store,
  ) { }

  update(user: User, photo: string): Observable<User> {
    const obs$ = () => photo ? this.storageService.uploadPhoto(`users/${user.uid}/${Date.now()}`, photo) : of(null);

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

          if (starredChannels.length === user.starredChannels?.length) return null;
          return this.afs.doc(`${Collections.Users}/${user.uid}`).update({ starredChannels: this.getStarredChannels(user, channel) });
        }),
      );
  }

  getById(uid: string): Observable<User> {
    if (!uid) { return of(null); }

    return this.afs.collection(Collections.Users).doc(uid).valueChanges().pipe(
      switchMap((user: DocumentSnapshot<User>) => of(user)),
      catchError((err: AuthError) => this.notificationService.handleError(err))
    ) as Observable<User>;
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

  private getStarredChannels(user: User, channelObj: { [key: string]: boolean }): string[] {
    const channelId = Object.keys(channelObj)[0];
    const channels = user.starredChannels || [];

    if (channelObj[channelId]) {
      return [...new Set([...channels, channelId])];
    }

    return channels.filter((id: string) => id !== channelId);
  }
}
