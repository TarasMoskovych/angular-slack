import { createFeatureSelector, createSelector } from '@ngrx/store';

import { themeAdapter, ThemesState } from './themes.state';

const getSelected = (state: ThemesState) => state.selected;

export const getThemesState = createFeatureSelector<ThemesState>('themes');
export const { selectAll: themesSelector } = themeAdapter.getSelectors(getThemesState);
export const themesSelectedSelector = createSelector(getThemesState, getSelected);
