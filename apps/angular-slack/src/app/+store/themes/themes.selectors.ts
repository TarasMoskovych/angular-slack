import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ThemesState } from './themes.state';

const getThemes = (state: ThemesState) => state.themes;

export const getThemesState = createFeatureSelector<ThemesState>('themes');
export const themesSelector = createSelector(getThemesState, getThemes);
