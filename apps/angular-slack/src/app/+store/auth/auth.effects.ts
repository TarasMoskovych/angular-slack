import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as authActions from './auth.actions';
import * as RouterActions from './../router';

import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { switchMap, map, catchError, pluck, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '@angular-slack/app/core/services';
import { AuthError, FirebaseUser, Status, User } from '@angular-slack/app/shared/models';
import { AuthState } from './auth.state';
import { authUserSelector } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private socket: Socket,
    private store: Store<AuthState>,
  ) {}

  getUserData(user: FirebaseUser): User {
    const { displayName, email, photoURL, emailVerified, uid } = user;
    return { displayName, email, photoURL, emailVerified, uid, status: Status.OFFLINE };
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
    withLatestFrom(this.store.select(authUserSelector)),
    switchMap(([action, user]) => {
      return this.authService
        .logout()
        .pipe(
          map(() => {
            this.emitStatus(user.uid, Status.OFFLINE);
            return authActions.logoutSuccess();
          }),
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
              this.emitStatus(user.uid, Status.ONLINE);
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

  private emitStatus(uid: string, status: Status) {
    this.socket.emit('status', { uid, status });
  }
}
