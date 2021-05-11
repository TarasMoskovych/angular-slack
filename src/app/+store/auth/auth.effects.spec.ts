import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';

import { AuthService } from 'src/app/core';
import { error, firebaseUser, user } from 'src/app/mock';
import * as authActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import * as routerActions from './../router';

describe('AuthEffects', () => {
  const authServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj('AuthService', [
    'login',
    'loginWithGoogle',
    'logout',
    'register',
    'getCurrentUser',
  ]);

  describe('login$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: authActions.login.type,
        user,
      }));
    });

    it('should return correct data when success', () => {
      authServiceSpy.login.and.returnValue(of(firebaseUser));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.login$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.loginSuccess.type);
        expect(action.user).toEqual(effects.getUserData(firebaseUser));
      });
    });

    it('should return correct data when error', () => {
      authServiceSpy.login.and.returnValue(throwError(error));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.login$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.loginError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('loginGoogle$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(authActions.loginGoogle));
    });

    it('should return correct data when success', () => {
      authServiceSpy.loginWithGoogle.and.returnValue(of(firebaseUser));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.loginGoogle$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.loginSuccess.type);
        expect(action.user).toEqual(effects.getUserData(firebaseUser));
      });
    });

    it('should return correct data when error', () => {
      authServiceSpy.loginWithGoogle.and.returnValue(throwError(error));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.loginGoogle$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.loginError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('logout$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(authActions.logout));
    });

    it('should return correct data when success', () => {
      authServiceSpy.logout.and.returnValue(of(undefined));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.logout$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.logoutSuccess.type);
      });
    });

    it('should return correct data when error', () => {
      authServiceSpy.logout.and.returnValue(throwError(error));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.logout$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.logoutError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('register$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: authActions.register.type,
        user,
      }));
    });

    it('should return correct data when success', () => {
      authServiceSpy.register.and.returnValue(of(undefined));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.register$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.registerSuccess.type);
      });
    });

    it('should return correct data when error', () => {
      authServiceSpy.register.and.returnValue(throwError(error));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.register$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.registerError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('stateChange$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: authActions.stateChange.type,
        user,
      }));
    });

    it('should return correct data when success', () => {
      authServiceSpy.getCurrentUser.and.returnValue(of({ ...user, emailVerified: true }));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.stateChange$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.stateChangeSuccess.type);
        expect(action.user).toEqual({ ...user, emailVerified: true });
      });
    });

    it('should return correct data when error', () => {
      authServiceSpy.getCurrentUser.and.returnValue(of({ ...user, emailVerified: false }));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.stateChange$.subscribe((action: any) => {
        expect(action.type).toBe(authActions.stateChangeError.type);
      });
    });
  });

  describe('registerLogoutSuccess$', () => {
    it('should return correct data when register success', () => {
      const actions$ = new Actions(of(authActions.registerSuccess));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.registerLogoutSuccess$.subscribe((action: any) => {
        expect(action.type).toBe(routerActions.go.type);
        expect(action.payload).toEqual({ path: ['/login'] });
      });
    });

    it('should return correct data when logout success', () => {
      const actions$ = new Actions(of(authActions.logoutSuccess));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.registerLogoutSuccess$.subscribe((action: any) => {
        expect(action.type).toBe(routerActions.go.type);
        expect(action.payload).toEqual({ path: ['/login'] });
      });
    });
  });

  describe('stateChangeLoginSuccess$', () => {
    it('should return correct data when state change success', () => {
      const actions$ = new Actions(of(authActions.stateChangeSuccess));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.stateChangeLoginSuccess$.subscribe((action: any) => {
        expect(action.type).toBe(routerActions.go.type);
        expect(action.payload).toEqual({ path: ['/app'] });
      });
    });

    it('should return correct data when login success', () => {
      const actions$ = new Actions(of(authActions.loginSuccess));
      const effects = new AuthEffects(actions$, authServiceSpy);

      effects.stateChangeLoginSuccess$.subscribe((action: any) => {
        expect(action.type).toBe(routerActions.go.type);
        expect(action.payload).toEqual({ path: ['/app'] });
      });
    });
  });
});
