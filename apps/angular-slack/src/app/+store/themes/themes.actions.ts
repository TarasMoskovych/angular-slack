import { createAction, props } from '@ngrx/store';
import { Theme } from '@angular-slack/app/shared';

const BASE = '[Themes]';

// add theme
export const addTheme = createAction(
  `${BASE} Add Theme`,
  props<{ theme: Theme }>(),
);

export const addThemeSuccess = createAction(
  `${BASE} Add Theme Success`,
  props<{ theme: Theme }>(),
);

export const addThemeError = createAction(
  `${BASE} Add Theme Error`,
  props<{ error: any }>(),
);

// get themes
export const getThemes = createAction(
  `${BASE} Get Themes`,
);

export const getThemesSuccess = createAction(
  `${BASE} Get Themes Success`,
  props<{ themes: Theme[] }>(),
);

export const getThemesError = createAction(
  `${BASE} Get Themes Error`,
  props<{ error: any }>(),
);
