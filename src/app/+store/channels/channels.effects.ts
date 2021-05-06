import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as channelsActions from './channels.actions';

import { of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { ChannelsService, UserProfileService } from 'src/app/core';
import { AuthError, Channel, User } from 'src/app/shared';

@Injectable()
export class ChannelsEffects {
  constructor(
    private actions$: Actions,
    private channelsService: ChannelsService,
    private userProfileService: UserProfileService,
  ) {}

  add$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.addChannel),
    pluck('channel'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .add(channel)
        .pipe(
          map(() => channelsActions.addChannelSuccess()),
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
    map((channels: Channel[]) => channelsActions.selectChannel({ channel: channels[0] }))),
  );

  select$ = createEffect(() => this.actions$.pipe(
    ofType(channelsActions.selectChannel),
    pluck('channel'),
    switchMap((channel: Channel) => {
      return this.userProfileService
        .getById(channel?.uid)
        .pipe(
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
          map((channel: Channel) => channelsActions.removeChannelSuccess({ channel })),
          catchError((error: AuthError) => of(channelsActions.removeChannelError({ error })))
        )
      }),
    ),
  );
}
