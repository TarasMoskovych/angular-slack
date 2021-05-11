import { createAction, props } from '@ngrx/store';
import { AuthError, User } from 'src/app/shared/models';

const BASE = '[Auth]';

// state change
export const stateChange = createAction(
  `${BASE} State Change`,
);

export const stateChangeSuccess = createAction(
  `${BASE} State Change Success`,
  props<{ user: User }>(),
);

export const stateChangeError = createAction(
  `${BASE} State Change Error`,
);

// register
export const register = createAction(
  `${BASE} Register`,
  props<{ user: User }>(),
);

export const registerSuccess = createAction(
  `${BASE} Register Success`,
);

export const registerError = createAction(
  `${BASE} Register Error`,
  props<{ error: AuthError }>(),
);

// login
export const login = createAction(
  `${BASE} Login`,
  props<{ user: User }>(),
);

export const loginGoogle = createAction(
  `${BASE} Login Google`,
);

export const loginSuccess = createAction(
  `${BASE} Login Success`,
  props<{ user: User }>(),
);

export const loginError = createAction(
  `${BASE} Login Error`,
  props<{ error: AuthError }>(),
);

// logout
export const logout = createAction(
  `${BASE} Logout`,
);

export const logoutSuccess = createAction(
  `${BASE} Logout Success`,
);

export const logoutError = createAction(
  `${BASE} Logout Error`,
  props<{ error: AuthError }>(),
);
