import { createReducer } from '@ngrx/store';

import { initialThemesState } from './themes.state';

export const themesReducer = createReducer(
  initialThemesState,
);
