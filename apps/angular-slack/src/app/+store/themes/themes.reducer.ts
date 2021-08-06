import { createReducer, on } from '@ngrx/store';

import { DEFAULT_THEME, initialThemesState, themeAdapter } from './themes.state';
import * as themesActions from './themes.actions';

export const themesReducer = createReducer(
  initialThemesState,
  on(themesActions.getThemesSuccess, (state, action) => themeAdapter.setAll(action.themes, { ...state, selected: action.selected })),
  on(themesActions.addThemeSuccess, (state, action) => themeAdapter.addOne(action.theme, { ...state, selected: action.theme })),
  on(themesActions.selectThemeSuccess, (state, action) => ({ ...state, selected: action.theme })),
  on(themesActions.editThemeSuccess, (state, action) => {
    return themeAdapter.updateOne({ id: action.theme.id, changes: action.theme }, { ...state, selected: action.theme });
  }),
  on(themesActions.removeThemeSuccess, (state, action) => {
    return themeAdapter.removeOne(
      action.theme.id, { ...state, selected: state.selected.id === action.theme.id ? DEFAULT_THEME : state.selected },
    );
  }),
);
