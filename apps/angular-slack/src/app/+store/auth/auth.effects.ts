import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as RouterActions from './../router';
import * as authActions from './auth.actions';

import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { catchError, filter, map, pluck, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '@angular-slack/app/core/services';
import { AuthError, FirebaseUser } from '@angular-slack/app/shared/models';
import { Events, Status, User } from '@libs/models';
import { authUserSelector } from './auth.selectors';
import { AuthState } from './auth.state';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private socket: Socket,
    private store: Store<AuthState>,
  ) {
    this.onInit();
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    pluck('user'),
    switchMap((user: User) => {
      return this.authService
        .login(user)
        .pipe(
          map((firebaseUser: FirebaseUser) => authActions.loginSuccess({ user: this.getUserData(firebaseUser) })),
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

  onInit() {
    this.socket.on(Events.Init, () => {
      this.store.select(authUserSelector)
        .pipe(
          filter((user: User) => user?.emailVerified),
          take(1),
        )
        .subscribe((user: User) => {
          this.emitStatus(user.uid, Status.ONLINE);
        });
    });
  }

  getUserData(user: FirebaseUser): User {
    const { displayName, email, photoURL, emailVerified, uid } = user;
    return { displayName, email, photoURL, emailVerified, uid, status: Status.OFFLINE };
  }

  private emitStatus(uid: string, status: Status) {
    this.socket.emit(Events.Status, { uid, status });
  }
}
