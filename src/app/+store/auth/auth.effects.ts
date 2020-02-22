import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';
import * as authActions from './auth.actions';

import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services';
import { User } from 'src/app/shared/models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Login>(AuthActionTypes.LOGIN),
    pluck('payload'),
    switchMap((user: User) => {
      return this.authService
        .login(user)
        .pipe(
          map(({ user }: firebase.auth.UserCredential) => new authActions.LoginSuccess(user)),
          catchError((err: firebase.auth.Error) => of(new authActions.LoginError(err)))
        )
      })
  );

  @Effect()
  loginGoogle$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.LoginGoogle>(AuthActionTypes.LOGIN_GOOGLE),
    switchMap(() => {
      return this.authService
        .loginWithGoole()
        .pipe(
          map((user: firebase.User) => new authActions.LoginSuccess(user)),
          catchError((err: firebase.auth.Error) => of(new authActions.LoginError(err)))
        )
      })
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Register>(AuthActionTypes.REGISTER),
    pluck('payload'),
    switchMap((user: User) => {
      return this.authService
        .register(user)
        .pipe(
          map((user: firebase.UserInfo) => new authActions.RegisterSuccess(user)),
          catchError((err: firebase.auth.Error) => of(new authActions.RegisterError(err)))
        )
      })
  );

  @Effect()
  stateChange$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.StateChange>(AuthActionTypes.STATE_CHANGE),
    switchMap(() => {
      return this.authService
        .onAuthStateChange()
        .pipe(
          map((user: firebase.User) => {
            if (user) {
              return new authActions.StateChangeSuccess(user);
            }
            return new authActions.StateChangeError();
          })
        )
      })
  );
}
