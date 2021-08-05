import { theme, theme2 } from '@angular-slack/app/mocks';

import { themesReducer } from './themes.reducer';
import { DEFAULT_THEME, initialThemesState } from './themes.state';
import * as themesActions from './themes.actions';

describe('themesReducer', () => {
  describe('default', () => {
    it('should return default state', () => {
      const state = themesReducer(undefined, {} as any);
      expect(state).toBe(initialThemesState);
    });
  });

  describe('getThemesSuccess', () => {
    it('should return correct state', () => {
      const state = themesReducer(initialThemesState, themesActions.getThemesSuccess({ themes: [theme], selected: theme }));
      expect(state).toEqual({ ...initialThemesState, selected: theme, ids: [theme.id], entities: { [theme.id]: theme } });
    });
  });

  describe('addThemeSuccess', () => {
    it('should return correct state', () => {
      const state = themesReducer(initialThemesState, themesActions.addThemeSuccess({ theme }));
      expect(state).toEqual({ ...initialThemesState, selected: theme, ids: [theme.id], entities: { [theme.id]: theme } });
    });
  });

  describe('selectThemeSuccess', () => {
    it('should return correct state', () => {
      const state = themesReducer(initialThemesState, themesActions.selectThemeSuccess({ theme }));
      expect(state).toEqual({ ...initialThemesState, selected: theme });
    });
  });

  describe('editThemeSuccess', () => {
    it('should return correct state', () => {
      const state = themesReducer({ ...initialThemesState, ids: [theme.id], entities: { [theme.id]: theme } }, themesActions.editThemeSuccess({ theme: { ...theme, primary: '#fff' } }));
      expect(state.entities[theme.id]).toEqual({ ...theme, primary: '#fff' });
    });
  });

  describe('removeThemeSuccess', () => {
    it('should return correct state when selected theme is a target', () => {
      const state = themesReducer({ ...initialThemesState, selected: theme, ids: [1, 2], entities: { 1: theme, 2: theme2 } }, themesActions.removeThemeSuccess({ theme }));
      expect(state.entities).toEqual({ 2: theme2 });
      expect(state.selected).toEqual(DEFAULT_THEME);
    });

    it('should return correct state when selected theme is not a target', () => {
      const state = themesReducer({ ...initialThemesState, selected: theme2, ids: [1, 2], entities: { 1: theme, 2: theme2 } }, themesActions.removeThemeSuccess({ theme }));
      expect(state.entities).toEqual({ 2: theme2 });
      expect(state.selected).toEqual(theme2);
    });
  });
});
