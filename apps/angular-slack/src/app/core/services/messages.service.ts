import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthError, Message, User } from '@angular-slack/app/shared';
import { Collections } from '@libs/models';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private afs: AngularFirestore,
    private notificationService: NotificationService,
    private storageService: StorageService,
  ) { }

  add(message: Message): Observable<Message> {
    const obs$ = () => message.media ? this.storageService.uploadPhoto(`public/user-${message.uid}/${Date.now()}`, message.content) : of(undefined);

    return obs$().pipe(
      switchMap((photoURL: string) => {
        return from(this.afs.collection<Message>(Collections.Messages).add({ ...message, content: message.media ? photoURL : message.content }))
          .pipe(
            map(() => message),
            catchError((err: AuthError) => this.notificationService.handleError(err)),
          );
      }),
      catchError((err: AuthError) => this.notificationService.handleError(err))
    );
  }

  getByChannelId(id: string): Observable<Message[]> {
    return this.afs.collection<Message>(Collections.Messages, ref => ref.where('channelId', '==', id).orderBy('id')).valueChanges();
  }

  getPrivateByChannelId(id: string, user: User): Observable<Message[]> {
    return this.afs.collection<Message>(Collections.Messages, ref => ref.where('channelId', '==', id).where('uid', '==', user.uid).orderBy('id')).valueChanges();
  }
}
