import { createAction, props } from '@ngrx/store';
import { Theme } from '@angular-slack/app/shared';

const BASE = '[Themes]';

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
