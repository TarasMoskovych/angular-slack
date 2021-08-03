import { createReducer, on } from '@ngrx/store';
import { Theme } from '@angular-slack/app/shared';

import { DEFAULT_THEME, initialThemesState } from './themes.state';
import * as themesActions from './themes.actions';

export const themesReducer = createReducer(
  initialThemesState,
  on(themesActions.addThemeSuccess, (state, action) => ({ ...state, themes: [...state.themes, action.theme], selected: { ...action.theme } })),
  on(themesActions.getThemesSuccess, (state, action) => ({ ...state, themes: [...action.themes], selected: { ...action.selected } })),
  on(themesActions.selectThemeSuccess, (state, action) => ({ ...state, selected: { ...action.theme } })),
  on(themesActions.editThemeSuccess, (state, action) => {
    const themes = [ ...state.themes ];
    const theme = { ...action.theme };
    themes.splice(themes.findIndex((item: Theme) => theme.id === item.id), 1, theme);

    return { ...state, selected: theme, themes };
  }),
  on(themesActions.removeThemeSuccess, (state, action) => {
    const themes = state.themes.filter((theme: Theme) => theme.id !== action.theme.id);
    let selected = state.selected;

    if (state.selected.id === action.theme.id) {
      selected = DEFAULT_THEME;
    }

    return { ...state, themes, selected };
  }),
);
