import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThemesService } from '@angular-slack/app/core';
import { catchError, map, of, pluck, switchMap } from 'rxjs';

import * as themesActions from './themes.actions';
import { Theme } from '@angular-slack/app/shared';

@Injectable()
export class ThemesEffects {

  constructor(
    private actions$: Actions,
    private themesService: ThemesService,
  ) {}

  add$ = createEffect(() => this.actions$.pipe(
    ofType(themesActions.addTheme),
    pluck('theme'),
    switchMap((theme: Theme) => {
      return this.themesService
        .add(theme)
        .pipe(
          map((theme: Theme) => themesActions.addThemeSuccess({ theme })),
          catchError((error: any) => of(themesActions.addThemeError({ error })))
        )
      }),
    ),
  );

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

  remove$ = createEffect(() => this.actions$.pipe(
    ofType(themesActions.removeTheme),
    pluck('theme'),
    switchMap((theme: Theme) => {
      return this.themesService
        .remove(theme)
        .pipe(
          map((theme: Theme) => themesActions.removeThemeSuccess({ theme })),
          catchError((error: any) => of(themesActions.removeThemeError({ error })))
        )
      }),
    ),
  );
}
