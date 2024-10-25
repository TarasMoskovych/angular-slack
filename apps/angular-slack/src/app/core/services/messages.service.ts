import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { combineLatest, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthError, FirestoreQuerySnapshot, Message } from '@angular-slack/app/shared';
import { Collections, User } from '@libs/models';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class MessagesService {

  constructor(
    private afs: AngularFirestore,
    private notificationService: NotificationService,
    private storageService: StorageService,
  ) { }

  add(message: Message): Observable<Message> {
    const obs$ = () => message.media ? this.storageService.uploadPhoto(
      `public/user-${message.uid}/${Date.now()}`, message.content, true
    ) : of(undefined);

    return obs$().pipe(
      switchMap((photoURL: string) => {
        return from(this.afs.collection<Message>(Collections.Messages).add({
          ...message,
          content: message.media ? photoURL : message.content })
        ).pipe(
            tap(() => this.storageService.progress$.next(null)),
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
    const myMessages$ = this.getMessagesCollection(`${user.uid}-${id}`).valueChanges() as Observable<Message[]>;
    const userMessages$ = this.getMessagesCollection(`${id}-${user.uid}`).valueChanges() as Observable<Message[]>;

    return combineLatest([myMessages$, userMessages$]).pipe(
      map(([arr1, arr2]) => [...arr1, ...arr2].sort((a, b) => a.id - b.id)),
    );
  }

  async removeAll(channelId: string): Promise<void> {
    const columnsSnapshot: FirestoreQuerySnapshot = await this.getMessagesCollection(channelId).get().toPromise();
    columnsSnapshot.forEach(doc => doc.ref.delete());
  }

  private getMessagesCollection(channelId: string): AngularFirestoreCollection {
    return this.afs.collection<Message>(Collections.Messages, ref => ref.where('channelId', '==', channelId));
  }
}
