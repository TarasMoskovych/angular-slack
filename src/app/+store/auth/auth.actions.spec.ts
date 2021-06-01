import { error, user } from 'src/app/mocks';
import * as authActions from './auth.actions';

describe('AuthActions', () => {
  describe('stateChange', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.stateChange();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] State Change');
    });
  });

  describe('stateChangeSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.stateChangeSuccess({ user });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] State Change Success');
    });

    it('should have correct payload', () => {
      expect(result.user).toEqual(user);
    });
  });

  describe('stateChangeError', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.stateChangeError();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] State Change Error');
    });
  });

  describe('register', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.register({ user });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Register');
    });

    it('should have correct payload', () => {
      expect(result.user).toEqual(user);
    });
  });

  describe('registerSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.registerSuccess();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Register Success');
    });
  });

  describe('registerError', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.registerError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Register Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('login', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.login({ user });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Login');
    });

    it('should have correct payload', () => {
      expect(result.user).toEqual(user);
    });
  });

  describe('loginGoogle', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.loginGoogle();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Login Google');
    });
  });

  describe('loginSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.loginSuccess({ user });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Login Success');
    });

    it('should have correct payload', () => {
      expect(result.user).toEqual(user);
    });
  });

  describe('loginError', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.loginError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Login Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('logout', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.logout();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Logout');
    });
  });

  describe('logoutSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.logoutSuccess();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Logout Success');
    });
  });

  describe('logoutError', () => {
    let result: any;

    beforeAll(() => {
      result = authActions.logoutError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Auth] Logout Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });
});
