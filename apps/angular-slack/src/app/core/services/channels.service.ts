import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, take } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import { Channel, AuthError, FirestoreQuerySnapshot, User } from '@angular-slack/app/shared';
import { authUserSelector } from '@angular-slack/app/+store/auth/auth.selectors';
import { Collections } from '@libs/models';

@Injectable({
  providedIn: CoreModule
})
export class ChannelsService {

  constructor(
    private afs: AngularFirestore,
    private notificationService: NotificationService,
    private store: Store,
  ) { }

  add(payload: Channel): Observable<Channel> {
    return this.store.select(authUserSelector)
      .pipe(
        take(1),
        exhaustMap((user: User) => {
          const { uid } = user;
          const channel: Channel = { ...payload, id: String(Date.now()), uid, private: false };

          return from(this.afs.collection(Collections.Channels).add(channel))
            .pipe(
              map(() => channel),
              catchError((err: AuthError) => this.notificationService.handleError(err)),
            );
        }),
      );
  }

  get(): Observable<Channel[]> {
    return this.afs.collection<Channel>(Collections.Channels, ref => ref.orderBy('name')).valueChanges();
  }

  getPrivate(): Observable<Channel[]> {
    return this.afs.collection<User>(Collections.Users).valueChanges()
      .pipe(map((users: User[]) => users.map((user: User) => this.getPrivateChannel(user))));
  }

  getStarred(): Observable<Channel[]> {
    return this.store.select(authUserSelector)
    .pipe(
      switchMap((user: User) => {
        if (!user?.starredChannels?.length) return of([]);
        return this.afs.collection<Channel>(Collections.Channels, ref => ref
          .where('id', 'in', user.starredChannels))
          .valueChanges();
      }),
    );
  }

  update(channel: Channel): Observable<Channel> {
    return this.getById(channel).pipe(
      switchMap((snapshot: FirestoreQuerySnapshot) => {
        if (!snapshot.empty) {
          return this.afs.doc(`${Collections.Channels}/${snapshot.docs[0].id}`).update({
            name: channel.name,
            description: channel.description
          });
        }
        return of(null);
      }),
      catchError((err: AuthError) => this.notificationService.handleError(err))
    );
  }

  remove(channel: Channel): Observable<void> {
    return this.getById(channel).pipe(
      switchMap((snapshot: FirestoreQuerySnapshot) => {
        if (!snapshot.empty) {
          return this.afs.doc(`${Collections.Channels}/${snapshot.docs[0].id}`).delete();
        }
        return of(null);
      }),
      catchError((err: AuthError) => this.notificationService.handleError(err))
    );
  }

  private getById(channel: Channel): Observable<FirestoreQuerySnapshot> {
    return from(this.afs.collection(Collections.Channels, ref => ref.where('id', '==', channel.id)).get());
  }

  private getPrivateChannel(user: User): Channel {
    return {
      id: user.uid,
      name: user.displayName,
      description: null,
      uid: user.uid,
      createdBy: user,
      starred: false,
      private: true,
      status: user.status,
    };
  }
}
