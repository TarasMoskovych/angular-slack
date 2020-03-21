import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { from, Observable } from 'rxjs';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';
import { Collections, Channel } from 'src/app/shared';
import { catchError } from 'rxjs/operators';

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
    const { uid, displayName, photoURL } = this.afauth.auth.currentUser;
    const createdBy = { id: uid, displayName, photoURL };

    return from(this.afs.collection(Collections.Channels).add({ ...channel, id: Date.now(), createdBy })).pipe(
      catchError((err: firebase.auth.Error) => this.notificationService.handleError(err))
    );
  }

  get(): Observable<Channel[]> {
    return <Observable<Channel[]>>this.afs.collection(Collections.Channels, ref => ref.orderBy('name')).valueChanges();
  }
}
