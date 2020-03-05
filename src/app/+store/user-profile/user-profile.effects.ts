import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserProfileActionTypes } from './user-profile.actions';
import * as userProfileActions from './user-profile.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck, tap } from 'rxjs/operators';

import { UserProfileService, NotificationService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { StateChangeSuccess } from '../auth';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private userProfileService: UserProfileService
  ) {}

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType<userProfileActions.UpdateProfile>(UserProfileActionTypes.UPDATE_PROFILE),
    pluck('payload'),
    switchMap(({ user, photoURL }) => {
      return this.userProfileService
        .update(user, photoURL)
        .pipe(
          map((data: User) => new userProfileActions.UpdateProfileSuccess(data)),
          catchError((err: firebase.auth.Error) => of(new userProfileActions.UpdateProfileError(err)))
        )
      })
  );

  @Effect()
  updateSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<userProfileActions.UpdateProfileSuccess>(UserProfileActionTypes.UPDATE_PROFILE_SUCCESS),
    pluck('payload'),
    tap(() => this.notificationService.show('User profile was updated.')),
    switchMap((user: User) => of(new StateChangeSuccess(user)))
  );
}

