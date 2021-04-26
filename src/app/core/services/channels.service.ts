import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { from, Observable, of } from 'rxjs';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import { Collections, Channel, AuthError, FirestoreQuerySnapshot, FirebaseUser } from 'src/app/shared';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: CoreModule
})
export class ChannelsService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  add(channel: Channel): Observable<DocumentReference> {
    return this.authService.getCurrentUser()
      .pipe(
        switchMap((firebaseUser: FirebaseUser) => {
          const { uid } = firebaseUser;
          return from(this.afs.collection(Collections.Channels).add({ ...channel, id: Date.now(), uid }))
            .pipe(
              catchError((err: AuthError) => this.notificationService.handleError(err)),
            );
        }),
      );
  }

  get(): Observable<Channel[]> {
    return <Observable<Channel[]>>this.afs.collection(Collections.Channels, ref => ref.orderBy('name')).valueChanges();
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
