import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument } from '@angular/fire/firestore';

import { from, Observable, of } from 'rxjs';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import { Collections, Channel } from 'src/app/shared';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: CoreModule
})
export class ChannelsService {

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private notificationService: NotificationService
  ) { }

  add(channel: Channel): Observable<DocumentReference> {
    const { uid } = this.afauth.auth.currentUser;

    return from(this.afs.collection(Collections.Channels).add({ ...channel, id: Date.now(), uid })).pipe(
      catchError((err: firebase.auth.Error) => this.notificationService.handleError(err))
    );
  }

  get(): Observable<Channel[]> {
    return <Observable<Channel[]>>this.afs.collection(Collections.Channels, ref => ref.orderBy('name')).valueChanges();
  }

  update(channel: Channel): Observable<Channel> {
    return this.getById(channel).pipe(
      switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        if (!snapshot.empty) {
          return this.afs.doc(`${Collections.Channels}/${snapshot.docs[0].id}`).update({
            name: channel.name,
            description: channel.description
          });
        }
        return of(null);
      }),
      catchError((err: firebase.auth.Error) => this.notificationService.handleError(err))
    );
  }

  remove(channel: Channel): Observable<Channel> {
    return this.getById(channel).pipe(
      switchMap((snapshot: firebase.firestore.QuerySnapshot) => {
        if (!snapshot.empty) {
          return this.afs.doc(`${Collections.Channels}/${snapshot.docs[0].id}`).delete();
        }
        return of(null);
      }),
      catchError((err: firebase.auth.Error) => this.notificationService.handleError(err))
    );
  }

  private getById(channel: Channel): Observable<firebase.firestore.QuerySnapshot> {
    return from(this.afs.collection(Collections.Channels, ref => ref.where('id', '==', channel.id)).get());
  }
}
