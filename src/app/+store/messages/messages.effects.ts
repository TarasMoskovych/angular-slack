import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';

import * as messagesActions from './messages.actions';
import * as channelsActions from 'src/app/+store/channels';
import { MessagesService } from 'src/app/core';
import { AuthError, Message } from 'src/app/shared';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
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

  selectChannelSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.selectChannelSuccess),
    map(() => messagesActions.searchMessages({ search: '' }))),
  );
}
