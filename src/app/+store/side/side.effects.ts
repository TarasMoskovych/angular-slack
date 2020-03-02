import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SideActionTypes } from './side.actions';
import * as sideActions from './side.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';
import { StateChangeSuccess } from '../auth';

@Injectable()
export class SideEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  @Effect()
  updateProfilePhoto$: Observable<Action> = this.actions$.pipe(
    ofType<sideActions.UpdateProfilePhoto>(SideActionTypes.UPDATE_PROFILE_PHOTO),
    pluck('payload'),
    switchMap(({ user, photoURL }) => {
      return this.authService
        .updateProfilePhoto(user, photoURL)
        .pipe(
          map((data: User) => new StateChangeSuccess(data)),
          catchError((err: firebase.auth.Error) => of(new sideActions.UpdateProfilePhotoError(err)))
        )
      })
  );
}
