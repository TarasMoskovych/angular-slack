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
  props<{ themes: Theme[], selected: Theme }>(),
);

export const getThemesError = createAction(
  `${BASE} Get Themes Error`,
  props<{ error: any }>(),
);

// select theme
export const selectTheme = createAction(
  `${BASE} Select Theme`,
  props<{ theme: Theme }>(),
);

export const selectThemeSuccess = createAction(
  `${BASE} Select Theme Success`,
  props<{ theme: Theme }>(),
);

export const selectThemeError = createAction(
  `${BASE} Select Theme Error`,
  props<{ error: any }>(),
);

// remove theme
export const removeTheme = createAction(
  `${BASE} Remove Theme`,
  props<{ theme: Theme }>(),
);

export const removeThemeSuccess = createAction(
  `${BASE} Remove Theme Success`,
  props<{ theme: Theme }>(),
);

export const removeThemeError = createAction(
  `${BASE} Remove Theme Error`,
  props<{ error: any }>(),
);
