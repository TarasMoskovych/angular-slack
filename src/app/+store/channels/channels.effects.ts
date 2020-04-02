import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ChannelsActionTypes } from './channels.actions';
import * as channelsActions from './channels.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { ChannelsService, UserProfileService } from 'src/app/core';
import { Channel, User } from 'src/app/shared';

@Injectable()
export class ChannelsEffects {
  constructor(
    private actions$: Actions,
    private channelsService: ChannelsService,
    private userProfileService: UserProfileService,
  ) {}

  @Effect()
  add$: Observable<Action> = this.actions$.pipe(
    ofType<channelsActions.AddChannel>(ChannelsActionTypes.ADD_CHANNEL),
    pluck('payload'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .add(channel)
        .pipe(
          map(() => new channelsActions.AddChannelSuccess()),
          catchError((err: firebase.auth.Error) => of(new channelsActions.AddChannelError(err)))
        )
      })
  );

  @Effect()
  get$: Observable<Action> = this.actions$.pipe(
    ofType<channelsActions.GetChannels>(ChannelsActionTypes.GET_CHANNELS),
    pluck('payload'),
    switchMap(() => {
      return this.channelsService
        .get()
        .pipe(
          map((channels: Channel[]) => new channelsActions.GetChannelsSuccess(channels)),
          catchError((err: firebase.auth.Error) => of(new channelsActions.GetChannelsError(err)))
        )
      })
  );

  @Effect()
  getSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<channelsActions.GetChannelsSuccess>(ChannelsActionTypes.GET_CHANNELS_SUCCESS),
    pluck('payload'),
    map((channels: Channel[]) => new channelsActions.SelectChannel(channels[0]))
  );

  @Effect()
  select$: Observable<Action> = this.actions$.pipe(
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
          catchError((err: firebase.auth.Error) => of(new channelsActions.SelectChannelError(err)))
        )
      })
  );

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType<channelsActions.UpdateChannel>(ChannelsActionTypes.UPDATE_CHANNEL),
    pluck('payload'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .update(channel)
        .pipe(
          map((channel: Channel) => new channelsActions.UpdateChannelSuccess(channel)),
          catchError((err: firebase.auth.Error) => of(new channelsActions.UpdateChannelError(err)))
        )
      })
  );

  @Effect()
  remove$: Observable<Action> = this.actions$.pipe(
    ofType<channelsActions.RemoveChannel>(ChannelsActionTypes.REMOVE_CHANNEL),
    pluck('payload'),
    switchMap((channel: Channel) => {
      return this.channelsService
        .remove(channel)
        .pipe(
          map((channel: Channel) => new channelsActions.RemoveChannelSuccess(channel)),
          catchError((err: firebase.auth.Error) => of(new channelsActions.UpdateChannelError(err)))
        )
      })
  );

}
