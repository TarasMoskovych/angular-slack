import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
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
    ofType(authActions.login),
    pluck('user'),
    switchMap((user: User) => {
      return this.authService
        .login(user)
        .pipe(
          map((user: FirebaseUser) => authActions.loginSuccess({ user: this.getUserData(user) })),
          catchError((error: AuthError) => of(authActions.loginError({ error })))
        )
      }),
    ),
  );

  loginGoogle$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.loginGoogle),
    switchMap(() => {
      return this.authService
        .loginWithGoogle()
        .pipe(
          map((user: FirebaseUser) => authActions.loginSuccess({ user: this.getUserData(user) })),
          catchError((error: AuthError) => of(authActions.loginError({ error })))
        )
      }),
    ),
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    switchMap(() => {
      return this.authService
        .logout()
        .pipe(
          map(() => authActions.logoutSuccess()),
          catchError((error: AuthError) => of(authActions.logoutError({ error })))
        )
      }),
    ),
  );

  register$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.register),
    pluck('user'),
    switchMap((user: User) => {
      return this.authService
        .register(user)
        .pipe(
          map(() => authActions.registerSuccess()),
          catchError((error: AuthError) => of(authActions.registerError({ error })))
        )
      }),
    ),
  );

  stateChange$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.stateChange),
    switchMap(() => {
      return this.authService
        .getCurrentUser()
        .pipe(
          map((user: User) => {
            if (user && user.emailVerified) {
              return authActions.stateChangeSuccess({ user });
            }
            return authActions.stateChangeError();
          }),
        );
      }),
    ),
  );

  registerLogoutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      authActions.registerSuccess,
      authActions.logoutSuccess
    ),
    map(() => RouterActions.go({ payload: { path: ['/login'] } }))),
  );

  stateChangeLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      authActions.stateChangeSuccess,
      authActions.loginSuccess
    ),
    map(() => RouterActions.go({ payload: { path: ['/app'] } }))),
  );
}
