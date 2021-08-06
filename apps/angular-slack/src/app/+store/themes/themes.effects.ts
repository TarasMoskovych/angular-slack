import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ThemesService } from '@angular-slack/app/core';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';

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
          map(({ themes, selected }) => themesActions.getThemesSuccess({ themes, selected })),
          catchError((error: any) => of(themesActions.getThemesError({ error })))
        )
      }),
    ),
  );

  add$ = createEffect(() => this.actions$.pipe(
    ofType(themesActions.addTheme),
    pluck('theme'),
    switchMap((theme: Theme) => {
      return this.themesService
        .add(theme)
        .pipe(
          map((response: Theme) => themesActions.addThemeSuccess({ theme: response })),
          catchError((error: any) => of(themesActions.addThemeError({ error })))
        )
      }),
    ),
  );

  edit$ = createEffect(() => this.actions$.pipe(
    ofType(themesActions.editTheme),
    pluck('theme'),
    switchMap((theme: Theme) => {
      return this.themesService
        .edit(theme)
        .pipe(
          map((response: Theme) => themesActions.editThemeSuccess({ theme: response })),
          catchError((error: any) => of(themesActions.editThemeError({ error })))
        )
      }),
    ),
  );

  select$ = createEffect(() => this.actions$.pipe(
    ofType(themesActions.selectTheme),
    pluck('theme'),
    switchMap((theme: Theme) => {
      return this.themesService
        .select(theme)
        .pipe(
          map((response: Theme) => themesActions.selectThemeSuccess({ theme: response })),
          catchError((error: any) => of(themesActions.selectThemeError({ error })))
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
          map((response: Theme) => themesActions.removeThemeSuccess({ theme: response })),
          catchError((error: any) => of(themesActions.removeThemeError({ error })))
        )
      }),
    ),
  );
}
