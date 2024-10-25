import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userProfileActions from './user-profile.actions';

import { of } from 'rxjs';
import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';

import { NotificationService, UserProfileService } from '@angular-slack/app/core/services';
import { AuthError } from '@angular-slack/app/shared/models';
import { User } from '@libs/models';
import { stateChangeSuccess } from '../auth';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private userProfileService: UserProfileService
  ) {}

  update$ = createEffect(() => this.actions$.pipe(
    ofType(userProfileActions.updateProfile),
    pluck('payload'),
    switchMap(({ user, photoURL }) => {
      return this.userProfileService
        .update(user, photoURL)
        .pipe(
          map((response: User) => userProfileActions.updateProfileSuccess({ user: response })),
          catchError((error: AuthError) => of(userProfileActions.updateProfileError({ error })))
        )
      }),
    ),
  );

  updateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(userProfileActions.updateProfileSuccess),
    pluck('user'),
    tap(() => this.notificationService.show('User profile was updated.')),
    switchMap((user: User) => of(stateChangeSuccess({ user })))),
  );

  starChannel$ = createEffect(() => this.actions$.pipe(
    ofType(userProfileActions.starChannel),
    pluck('channel'),
    switchMap((channel: { [key: number]: boolean }) => {
      return this.userProfileService.starChannel(channel);
    })), { dispatch: false },
  );
}
