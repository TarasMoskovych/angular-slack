import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthError, Message, User } from '@angular-slack/app/shared';
import { Collections } from '@libs/models';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private afs: AngularFirestore,
    private notificationService: NotificationService,
  ) { }

  add(message: Message): Observable<Message> {
    return from(this.afs.collection<Message>(Collections.Messages).add(message))
      .pipe(
        map(() => message),
        catchError((err: AuthError) => this.notificationService.handleError(err)),
      );
  }

  getByChannelId(id: string): Observable<Message[]> {
    return this.afs.collection<Message>(Collections.Messages, ref => ref.where('channelId', '==', id).orderBy('id')).valueChanges();
  }

  getPrivateByChannelId(id: string, user: User): Observable<Message[]> {
    return this.afs.collection<Message>(Collections.Messages, ref => ref.where('channelId', '==', id).where('uid', '==', user.uid).orderBy('id')).valueChanges();
  }
}
