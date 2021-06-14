import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as channelsActions from './channels.actions';

import { of } from 'rxjs';
import { switchMap, map, catchError, pluck, take, withLatestFrom } from 'rxjs/operators';

import { ChannelsService, UserProfileService } from '@angular-slack/app/core';
import { AuthError, Channel, User } from '@angular-slack/app/shared';

import { Store } from '@ngrx/store';
import { ChannelsState } from './channels.state';
import { channelsSelectedSelector } from './channels.selectors';
import { authUserSelector } from '../auth';

@Injectable()
export class ChannelsEffects {
  constructor(
    private actions$: Actions,
    private channelsService: ChannelsService,
    private userProfileService: UserProfileService,
    private store: Store<ChannelsState>,
  ) {}

  add$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.addChannel),
    pluck('channel'),
    withLatestFrom(this.store.select(authUserSelector)),
    switchMap(([channel, user]) => {
      return this.channelsService
        .add(channel)
        .pipe(
          map((response: Channel) => channelsActions.addChannelSuccess({ channel: { ...response, createdBy: user } })),
          catchError((error: AuthError) => of(channelsActions.addChannelError({ error })))
        )
      }),
    ),
  );

  get$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.getChannels),
    switchMap(() => {
      return this.channelsService
        .get()
        .pipe(
          map((channels: Channel[]) => channelsActions.getChannelsSuccess({ channels })),
          catchError((error: AuthError) => of(channelsActions.getChannelsError({ error })))
        )
      }),
    ),
  );

  getPrivate$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.getPrivateChannels),
    switchMap(() => {
      return this.channelsService
        .getPrivate()
        .pipe(
          map((channels: Channel[]) => channelsActions.getPrivateChannelsSuccess({ channels })),
          catchError((error: AuthError) => of(channelsActions.getPrivateChannelsError({ error })))
        )
      }),
    ),
  );

  getStarred$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.getStarredChannels),
    switchMap(() => {
      return this.channelsService
        .getStarred()
        .pipe(
          map((channels: Channel[]) => channelsActions.getStarredChannelsSuccess({ channels })),
          catchError((error: AuthError) => of(channelsActions.getStarredChannelsError({ error })))
        )
      }),
    ),
  );

  getSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.getChannelsSuccess),
    pluck('channels'),
    withLatestFrom(this.store.select(channelsSelectedSelector)),
    map(([channels, selected]) => {
      const existed = channels.find((channel: Channel) => channel.id === selected?.id);

      if (!selected || !existed) {
        return channelsActions.selectChannel({ channel: channels[0] });
      }
      return channelsActions.selectChannelSuccess({ channel: selected });
    })),
  );

  select$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.selectChannel),
    pluck('channel'),
    switchMap((channel: Channel) => {
      return this.userProfileService
        .getById(channel?.uid)
        .pipe(
          take(1),
          map((user: User) => {
            if (user && channel) {
              return channelsActions.selectChannelSuccess({ channel: { ...channel, createdBy: user } })
            }
            throw new Error('User or Channel is not defined');
          }),
          catchError((error: AuthError) => of(channelsActions.selectChannelError({ error })))
        )
      }),
    ),
  );

  update$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.updateChannel),
    pluck('channel'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .update(channel)
        .pipe(
          map((channel: Channel) => channelsActions.updateChannelSuccess({ channel })),
          catchError((error: AuthError) => of(channelsActions.updateChannelError({ error })))
        )
      }),
    ),
  );

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.removeChannel),
    pluck('channel'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .remove(channel)
        .pipe(
          map(() => channelsActions.removeChannelSuccess({ channel })),
          catchError((error: AuthError) => of(channelsActions.removeChannelError({ error })))
        )
      }),
    ),
  );
}
