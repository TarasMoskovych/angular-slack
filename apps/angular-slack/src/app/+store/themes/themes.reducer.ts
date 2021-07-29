import { createReducer, on } from '@ngrx/store';

import { initialThemesState } from './themes.state';
import * as themesActions from './themes.actions';

export const themesReducer = createReducer(
  initialThemesState,
  on(themesActions.addThemeSuccess, (state, action) => ({ ...state, themes: [...state.themes, action.theme] })),
  on(themesActions.getThemesSuccess, (state, action) => ({ ...state, themes: [...action.themes] })),
);
