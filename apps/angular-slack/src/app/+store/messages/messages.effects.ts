import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as messagesActions from './messages.actions';
import * as channelsActions from '@angular-slack/app/+store/channels';
import { MessagesService } from '@angular-slack/app/core';
import { AuthError, Message } from '@angular-slack/app/shared';
import { MessagesState } from './messages.state';
import { authUserSelector } from '../auth';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
    private store: Store<MessagesState>,
  ) {}

  add$ = createEffect(() => this.actions$.pipe(
    ofType(messagesActions.addMessage),
    pluck('message'),
    switchMap((message: Message) => {
      return this.messagesService
        .add(message)
        .pipe(
          map(() => messagesActions.addMessageSuccess()),
          catchError((error: AuthError) => of(messagesActions.addMessageError({ error })))
        )
      }),
    ),
  );

  get$ = createEffect(() => this.actions$.pipe(
    ofType(messagesActions.getMessages),
    pluck('channelId'),
    switchMap((id: string) => {
      return this.messagesService
        .getByChannelId(id)
        .pipe(
          map((messages: Message[]) => messagesActions.getMessagesSuccess({ messages })),
          catchError((error: AuthError) => of(messagesActions.getMessagesError({ error })))
        )
      }),
    ),
  );

  getPrivate$ = createEffect(() => this.actions$.pipe(
    ofType(messagesActions.getPrivateMessages),
    pluck('channelId'),
    withLatestFrom(this.store.select(authUserSelector)),
    switchMap(([id, user]) => {
      return this.messagesService
        .getPrivateByChannelId(id, user)
        .pipe(
          map((messages: Message[]) => messagesActions.getPrivateMessagesSuccess({ messages })),
          catchError((error: AuthError) => of(messagesActions.getPrivateMessagesError({ error })))
        )
      }),
    ),
  );

  selectChannelSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.selectChannelSuccess),
    map(() => messagesActions.searchMessages({ search: '' }))),
  );
}
