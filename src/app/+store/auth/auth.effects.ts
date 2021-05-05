import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';
import * as authActions from './auth.actions';
import * as RouterActions from './../router';

import { Observable, of } from 'rxjs';
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
    const { displayName, email, photoURL, emailVerified, uid, updateProfile } = user;
    return { displayName, email, photoURL, emailVerified, uid, updateProfile };
  }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.Login>(AuthActionTypes.LOGIN),
    pluck('payload'),
    switchMap((user: User) => {
      return this.authService
        .login(user)
        .pipe(
          map((user: FirebaseUser) => new authActions.LoginSuccess(this.getUserData(user))),
          catchError((err: AuthError) => of(new authActions.LoginError(err)))
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
          map((user: FirebaseUser) => new authActions.LoginSuccess(this.getUserData(user))),
          catchError((err: AuthError) => of(new authActions.LoginError(err)))
        )
      })
  );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.LoginGoogle>(AuthActionTypes.LOGOUT),
    switchMap(() => {
      return this.authService
        .logout()
        .pipe(
          map(() => new authActions.LogoutSuccess()),
          catchError((err: AuthError) => of(new authActions.LogoutError(err)))
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
          map(() => new authActions.RegisterSuccess()),
          catchError((err: AuthError) => of(new authActions.RegisterError(err)))
        )
      })
  );

  @Effect()
  stateChange$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.StateChange>(AuthActionTypes.STATE_CHANGE),
    switchMap(() => {
      return this.authService
        .getCurrentUser()
        .pipe(
          map((user: FirebaseUser) => {
            if (user && user.emailVerified) {
              return new authActions.StateChangeSuccess(this.getUserData(user));
            }
            return new authActions.StateChangeError();
          })
        )
      })
  );

  @Effect()
  registerLogoutSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.RegisterSuccess | authActions.LogoutSuccess>(
      AuthActionTypes.REGISTER_SUCCESS,
      AuthActionTypes.LOGOUT_SUCCESS
    ),
    map(() => new RouterActions.Go({ path: ['/login'] }))
  );

  @Effect()
  stateChangeLoginSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.StateChangeSuccess | authActions.StateChangeSuccess>(
      AuthActionTypes.STATE_CHANGE_SUCCESS,
      AuthActionTypes.LOGIN_SUCCESS
    ),
    map(() => new RouterActions.Go({ path: ['/app'] }))
  );
}
