import { theme } from '@angular-slack/app/mocks';
import { initialThemesState } from './themes.state';
import * as themesSelectors from './themes.selectors';

describe('ThemesSelectors', () => {
  describe('themesSelectedSelector', () => {
    it('should return correct value', () => {
      expect(themesSelectors.themesSelectedSelector.projector({ ...initialThemesState, selected: theme })).toEqual(theme);
    });
  });
});
