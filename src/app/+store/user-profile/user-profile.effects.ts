import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserProfileActionTypes } from './user-profile.actions';
import * as userProfileActions from './user-profile.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { UserProfileService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { StateChangeSuccess } from '../auth';

@Injectable()
export class UserProfileEffects {
  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType<userProfileActions.Update>(UserProfileActionTypes.UPDATE),
    pluck('payload'),
    switchMap(({ user, photoURL }) => {
      return this.userProfileService
        .update(user, photoURL)
        .pipe(
          map((data: User) => new userProfileActions.UpdateSuccess(data)),
          catchError((err: firebase.auth.Error) => of(new userProfileActions.UpdateError(err)))
        )
      })
  );

  @Effect()
  updateSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<userProfileActions.UpdateSuccess>(UserProfileActionTypes.UPDATE_SUCCESS),
    pluck('payload'),
    switchMap((user: User) => of(new StateChangeSuccess(user)))
  );
}

