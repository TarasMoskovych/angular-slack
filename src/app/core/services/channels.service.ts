import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import { Collections, Channel, AuthError, FirestoreQuerySnapshot, User } from 'src/app/shared';
import { catchError, exhaustMap, map, switchMap, take } from 'rxjs/operators';
import { authUserSelector } from 'src/app/+store/auth/auth.selectors';

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
          const channel = { ...payload, id: String(Date.now()), uid };

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

  remove(channel: Channel): Observable<Channel> {
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
}
