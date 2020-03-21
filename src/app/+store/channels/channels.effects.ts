import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ChannelsActionTypes } from './channels.actions';
import * as channelsActions from './channels.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { ChannelsService } from 'src/app/core';
import { Channel } from 'src/app/shared';

@Injectable()
export class ChannelsEffects {
  constructor(
    private actions$: Actions,
    private channelsService: ChannelsService
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

}
