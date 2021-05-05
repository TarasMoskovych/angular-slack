import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';
import * as authActions from './auth.actions';
import * as RouterActions from './../router';

import { of } from 'rxjs';
import { switchMap, map, catchError, pluck } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services';
import { AuthError, FirebaseUser, User } from 'src/app/shared/models';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  getUserData(user: FirebaseUser): User {
    const { displayName, email, photoURL, emailVerified, uid } = user;
    return { displayName, email, photoURL, emailVerified, uid };
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType<authActions.Login>(AuthActionTypes.LOGIN),
    pluck('payload'),
    switchMap((user: User) => {
      return this.authService
        .login(user)
        .pipe(
          map((user: FirebaseUser) => new authActions.LoginSuccess(this.getUserData(user))),
          catchError((err: AuthError) => of(new authActions.LoginError(err)))
        )
      }),
    ),
  );

  loginGoogle$ = createEffect(() => this.actions$.pipe(
    ofType<authActions.LoginGoogle>(AuthActionTypes.LOGIN_GOOGLE),
    switchMap(() => {
      return this.authService
        .loginWithGoole()
        .pipe(
          map((user: FirebaseUser) => new authActions.LoginSuccess(this.getUserData(user))),
          catchError((err: AuthError) => of(new authActions.LoginError(err)))
        )
      }),
    ),
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType<authActions.LoginGoogle>(AuthActionTypes.LOGOUT),
    switchMap(() => {
      return this.authService
        .logout()
        .pipe(
          map(() => new authActions.LogoutSuccess()),
          catchError((err: AuthError) => of(new authActions.LogoutError(err)))
        )
      }),
    ),
  );

  register$ = createEffect(() => this.actions$.pipe(
    ofType<authActions.Register>(AuthActionTypes.REGISTER),
    pluck('payload'),
    switchMap((user: User) => {
      return this.authService
        .register(user)
        .pipe(
          map(() => new authActions.RegisterSuccess()),
          catchError((err: AuthError) => of(new authActions.RegisterError(err)))
        )
      }),
    ),
  );

  stateChange$ = createEffect(() => this.actions$.pipe(
    ofType<authActions.StateChange>(AuthActionTypes.STATE_CHANGE),
    switchMap(() => {
      return this.authService
        .getCurrentUser()
        .pipe(
          map((user: User) => {
            if (user && user.emailVerified) {
              return new authActions.StateChangeSuccess(user);
            }
            return new authActions.StateChangeError();
          }),
        );
      }),
    ),
  );

  registerLogoutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType<authActions.RegisterSuccess | authActions.LogoutSuccess>(
      AuthActionTypes.REGISTER_SUCCESS,
      AuthActionTypes.LOGOUT_SUCCESS
    ),
    map(() => RouterActions.go({ payload: { path: ['/login'] } }))),
  );

  stateChangeLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType<authActions.StateChangeSuccess | authActions.StateChangeSuccess>(
      AuthActionTypes.STATE_CHANGE_SUCCESS,
      AuthActionTypes.LOGIN_SUCCESS
    ),
    map(() => RouterActions.go({ payload: { path: ['/app'] } }))),
  );
}
