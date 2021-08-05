import { error, theme } from '@angular-slack/app/mocks';
import * as themesActions from './themes.actions';

describe('ThemesActions', () => {
  describe('getThemes', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.getThemes();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Get Themes');
    });
  });

  describe('getThemesSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.getThemesSuccess({ themes: [theme], selected: theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Get Themes Success');
    });

    it('should have correct payload', () => {
      expect(result.themes).toEqual([theme]);
    });
  });

  describe('getThemesError', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.getThemesError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Get Themes Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('addTheme', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.addTheme({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Add Theme');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('addThemeSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.addThemeSuccess({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Add Theme Success');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('addThemeError', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.addThemeError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Add Theme Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('editTheme', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.editTheme({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Edit Theme');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('editThemeSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.editThemeSuccess({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Edit Theme Success');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('editThemeError', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.editThemeError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Edit Theme Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('selectTheme', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.selectTheme({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Select Theme');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('selectThemeSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.selectThemeSuccess({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Select Theme Success');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('selectThemeError', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.selectThemeError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Select Theme Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('removeTheme', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.removeTheme({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Remove Theme');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('removeThemeSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.removeThemeSuccess({ theme });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Remove Theme Success');
    });

    it('should have correct payload', () => {
      expect(result.theme).toEqual(theme);
    });
  });

  describe('removeThemeError', () => {
    let result: any;

    beforeAll(() => {
      result = themesActions.removeThemeError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Themes] Remove Theme Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });
});
