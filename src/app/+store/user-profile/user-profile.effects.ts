import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserProfileActionTypes } from './user-profile.actions';
import * as userProfileActions from './user-profile.actions';

import { of } from 'rxjs';
import { switchMap, map, catchError, pluck, tap } from 'rxjs/operators';

import { UserProfileService, NotificationService } from 'src/app/core/services';
import { AuthError, User } from 'src/app/shared/models';
import { StateChangeSuccess } from '../auth';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private userProfileService: UserProfileService
  ) {}

  update$ = createEffect(() => this.actions$.pipe(
    ofType<userProfileActions.UpdateProfile>(UserProfileActionTypes.UPDATE_PROFILE),
    pluck('payload'),
    switchMap(({ user, photoURL }) => {
      return this.userProfileService
        .update(user, photoURL)
        .pipe(
          map((data: User) => new userProfileActions.UpdateProfileSuccess(data)),
          catchError((err: AuthError) => of(new userProfileActions.UpdateProfileError(err)))
        )
      }),
    ),
  );

  updateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType<userProfileActions.UpdateProfileSuccess>(UserProfileActionTypes.UPDATE_PROFILE_SUCCESS),
    pluck('payload'),
    tap(() => this.notificationService.show('User profile was updated.')),
    switchMap((user: User) => of(new StateChangeSuccess(user)))),
  );

  starChannel$ = createEffect(() => this.actions$.pipe(
    ofType<userProfileActions.StarChannel>(UserProfileActionTypes.STAR_CHANNEL),
    pluck('payload'),
    switchMap((payload: { [key: number]: boolean }) => {
      return this.userProfileService.starChannel(payload);
    })), { dispatch: false },
  );
}
