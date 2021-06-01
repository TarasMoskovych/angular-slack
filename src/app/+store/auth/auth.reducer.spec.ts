import { error, user } from 'src/app/mocks';
import * as authActions from './auth.actions';
import { authReducer } from './auth.reducer';
import { initialAuthState } from './auth.state';

describe('AuthReducer', () => {
  describe('default', () => {
    it('should return default state', () => {
      const state = authReducer(undefined, {} as any);
      expect(state).toBe(initialAuthState);
    });
  });

  describe('stateChangeSuccess', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.stateChangeSuccess({ user }));
      expect(state).toEqual({ ...initialAuthState, user });
    });
  });

  describe('stateChangeError', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.stateChangeError());
      expect(state).toEqual({ ...initialAuthState, user: null });
    });
  });

  describe('login', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.login({ user }));
      expect(state).toEqual({ ...initialAuthState, loading: true });
    });
  });

  describe('loginGoogle', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.loginGoogle());
      expect(state).toEqual({ ...initialAuthState, loading: true });
    });
  });

  describe('loginSuccess', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.loginSuccess({ user }));
      expect(state).toEqual({ ...initialAuthState, authorizeData: null, loading: false, user });
    });
  });

  describe('loginError', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.loginError({ error }));
      expect(state).toEqual({ ...initialAuthState, authorizeData: null, loading: false });
    });
  });

  describe('register', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.register({ user }));
      expect(state).toEqual({ ...initialAuthState, authorizeData: user, loading: true });
    });
  });

  describe('registerSuccess', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.registerSuccess());
      expect(state).toEqual({ ...initialAuthState, loading: false });
    });
  });

  describe('registerError', () => {
    it('should return correct state', () => {
      const state = authReducer(initialAuthState, authActions.registerError({ error }));
      expect(state).toEqual({ ...initialAuthState, authorizeData: null, loading: false });
    });
  });
});
