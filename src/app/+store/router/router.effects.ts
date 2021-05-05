import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as RouterActions from './router.actions';

import { tap, pluck } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.go),
    pluck('payload'),
    tap(({ path, queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })), { dispatch: false },
  );

  navigateBack$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.back),
    tap(() => this.location.back())), { dispatch: false },
  );

  navigateForward$ = createEffect(() => this.actions$.pipe(
    ofType(RouterActions.forward),
    tap(() => this.location.forward())), { dispatch: false },
  );
}
