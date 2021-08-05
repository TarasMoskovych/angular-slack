import { ThemesService } from '@angular-slack/app/core';
import { error, theme } from '@angular-slack/app/mocks';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';

import * as themesActions from './themes.actions';
import { ThemesEffects } from './themes.effects';

describe('ThemesEffects', () => {
  const themesServiceSpy: jasmine.SpyObj<ThemesService> = jasmine.createSpyObj('ThemesService', [
    'get',
    'add',
    'edit',
    'select',
    'remove',
  ]);

  describe('get$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(themesActions.getThemes));
    });

    it('should return correct action type when success', () => {
      themesServiceSpy.get.and.returnValue(of({ themes: [theme], selected: theme }));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.get$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.getThemesSuccess.type);
        expect(action.themes).toEqual([theme]);
      });
    });

    it('should return correct data when error', () => {
      themesServiceSpy.get.and.returnValue(throwError(error));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.get$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.getThemesError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('add$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: themesActions.addTheme.type,
        theme,
      }));
    });

    it('should return correct action type when success', () => {
      themesServiceSpy.add.and.returnValue(of(theme));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.add$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.addThemeSuccess.type);
        expect(action.theme).toEqual(theme);
      });
    });

    it('should return correct data when error', () => {
      themesServiceSpy.add.and.returnValue(throwError(error));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.add$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.addThemeError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('edit$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: themesActions.editTheme.type,
        theme,
      }));
    });

    it('should return correct action type when success', () => {
      themesServiceSpy.edit.and.returnValue(of(theme));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.edit$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.editThemeSuccess.type);
        expect(action.theme).toEqual(theme);
      });
    });

    it('should return correct data when error', () => {
      themesServiceSpy.edit.and.returnValue(throwError(error));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.edit$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.editThemeError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('select$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: themesActions.selectTheme.type,
        theme,
      }));
    });

    it('should return correct action type when success', () => {
      themesServiceSpy.select.and.returnValue(of(theme));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.select$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.selectThemeSuccess.type);
        expect(action.theme).toEqual(theme);
      });
    });

    it('should return correct data when error', () => {
      themesServiceSpy.select.and.returnValue(throwError(error));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.select$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.selectThemeError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('remove$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: themesActions.removeTheme.type,
        theme,
      }));
    });

    it('should return correct action type when success', () => {
      themesServiceSpy.remove.and.returnValue(of(theme));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.remove$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.removeThemeSuccess.type);
        expect(action.theme).toEqual(theme);
      });
    });

    it('should return correct data when error', () => {
      themesServiceSpy.remove.and.returnValue(throwError(error));
      const effects = new ThemesEffects(actions$, themesServiceSpy);

      effects.remove$.subscribe((action: any) => {
        expect(action.type).toBe(themesActions.removeThemeError.type);
        expect(action.error).toEqual(error);
      });
    });
  });
});
