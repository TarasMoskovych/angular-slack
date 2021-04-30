import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChannelsActionTypes } from './channels.actions';
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
    ofType<channelsActions.AddChannel>(ChannelsActionTypes.ADD_CHANNEL),
    pluck('payload'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .add(channel)
        .pipe(
          map(() => new channelsActions.AddChannelSuccess()),
          catchError((err: AuthError) => of(new channelsActions.AddChannelError(err)))
        )
      }),
    ),
  );

  get$ = createEffect(() => this.actions$.pipe(
    ofType<channelsActions.GetChannels>(ChannelsActionTypes.GET_CHANNELS),
    pluck('payload'),
    switchMap(() => {
      return this.channelsService
        .get()
        .pipe(
          map((channels: Channel[]) => new channelsActions.GetChannelsSuccess(channels)),
          catchError((err: AuthError) => of(new channelsActions.GetChannelsError(err)))
        )
      }),
    ),
  );

  getStarred$ = createEffect(() => this.actions$.pipe(
    ofType<channelsActions.GetStarredChannels>(ChannelsActionTypes.GET_STARRED_CHANNELS),
    pluck('payload'),
    switchMap(() => {
      return this.channelsService
        .getStarred()
        .pipe(
          map((channels: Channel[]) => new channelsActions.GetStarredChannelsSuccess(channels)),
          catchError((err: AuthError) => of(new channelsActions.GetStarredChannelsError(err)))
        )
      }),
    ),
  );

  getSuccess$ = createEffect(() => this.actions$.pipe(
    ofType<channelsActions.GetChannelsSuccess>(ChannelsActionTypes.GET_CHANNELS_SUCCESS),
    pluck('payload'),
    map((channels: Channel[]) => new channelsActions.SelectChannel(channels[0]))),
  );

  select$ = createEffect(() => this.actions$.pipe(
    ofType<channelsActions.SelectChannel>(ChannelsActionTypes.SELECT_CHANNEL),
    pluck('payload'),
    switchMap((channel: Channel) => {
      return this.userProfileService
        .getById(channel?.uid)
        .pipe(
          map((user: User) => {
            if (user && channel) {
              return new channelsActions.SelectChannelSuccess({ ...channel, createdBy: user })
            }
            throw new Error('User or Channel is not defined');
          }),
          catchError((err: AuthError) => of(new channelsActions.SelectChannelError(err)))
        )
      }),
    ),
  );

  update$ = createEffect(() => this.actions$.pipe(
    ofType<channelsActions.UpdateChannel>(ChannelsActionTypes.UPDATE_CHANNEL),
    pluck('payload'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .update(channel)
        .pipe(
          map((channel: Channel) => new channelsActions.UpdateChannelSuccess(channel)),
          catchError((err: AuthError) => of(new channelsActions.UpdateChannelError(err)))
        )
      }),
    ),
  );

  remove$ = createEffect(() => this.actions$.pipe(
    ofType<channelsActions.RemoveChannel>(ChannelsActionTypes.REMOVE_CHANNEL),
    pluck('payload'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .remove(channel)
        .pipe(
          map((channel: Channel) => new channelsActions.RemoveChannelSuccess(channel)),
          catchError((err: AuthError) => of(new channelsActions.UpdateChannelError(err)))
        )
      }),
    ),
  );
}
