import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ThemesState } from './themes.state';

const getThemes = (state: ThemesState) => state.themes;
const getSelected = (state: ThemesState) => state.selected;

export const getThemesState = createFeatureSelector<ThemesState>('themes');
export const themesSelector = createSelector(getThemesState, getThemes);
export const themesSelectedSelector = createSelector(getThemesState, getSelected);
