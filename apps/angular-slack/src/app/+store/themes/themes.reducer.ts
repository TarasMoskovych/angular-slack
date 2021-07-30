import { createReducer, on } from '@ngrx/store';
import { Theme } from '@angular-slack/app/shared';

import { initialThemesState } from './themes.state';
import * as themesActions from './themes.actions';

export const themesReducer = createReducer(
  initialThemesState,
  on(themesActions.addThemeSuccess, (state, action) => ({ ...state, themes: [...state.themes, action.theme] })),
  on(themesActions.getThemesSuccess, (state, action) => ({ ...state, themes: [...action.themes] })),
  on(themesActions.removeThemeSuccess, (state, action) => ({ ...state, themes: state.themes.filter((theme: Theme) => theme.id !== action.theme.id) })),
);
