import { createReducer, on } from '@ngrx/store';

import { initialAuthState } from './auth.state';
import * as authActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.stateChangeSuccess, (state, action) => ({ ...state, user: action.user })),
  on(authActions.stateChangeError, state => ({ ...state, user: null })),
  on(authActions.login, state => ({ ...state, loading: true })),
  on(authActions.loginGoogle, state => ({ ...state, loading: true })),
  on(authActions.loginSuccess, (state, action) => ({ ...state, authorizeData: null, loading: false, user: action.user })),
  on(authActions.loginError, state => ({ ...state, authorizeData: null, loading: false })),
  on(authActions.register, (state, action) => ({ ...state, authorizeData: action.user, loading: true })),
  on(authActions.registerSuccess, state => ({ ...state, loading: false })),
  on(authActions.registerError, state => ({ ...state, authorizeData: null, loading: false })),
);
