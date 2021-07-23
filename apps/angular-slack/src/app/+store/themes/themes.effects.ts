import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThemesService } from '@angular-slack/app/core';
import { catchError, map, of, switchMap } from 'rxjs';

import * as themesActions from './themes.actions';
import { Theme } from '@angular-slack/app/shared';

@Injectable()
export class ThemesEffects {

  constructor(
    private actions$: Actions,
    private themesService: ThemesService,
  ) {}

  get$ = createEffect(() => this.actions$.pipe(
    ofType(themesActions.getThemes),
    switchMap(() => {
      return this.themesService
        .get()
        .pipe(
          map((themes: Theme[]) => themesActions.getThemesSuccess({ themes })),
          catchError((error: any) => of(themesActions.getThemesError({ error })))
        )
      }),
    ),
  );
}
