import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models';

export enum AuthActionTypes {
  STATE_CHANGE         = '[Auth] State Change',
  STATE_CHANGE_SUCCESS = '[Auth] State Change Success',
  STATE_CHANGE_ERROR   = '[Auth] State Change Error ',

  REGISTER             = '[Auth] Register',
  REGISTER_SUCCESS     = '[Auth] Register Success',
  REGISTER_ERROR       = '[Auth] Register Error',

  LOGIN                = '[Auth] Login',
  LOGIN_GOOGLE         = '[Auth] Login Google',
  LOGIN_SUCCESS        = '[Auth] Login Success',
  LOGIN_ERROR          = '[Auth] Login Error',

  LOGOUT               = '[Auth] Logout',
  LOGOUT_SUCCESS       = '[Auth] Logout Success',
  LOGOUT_ERROR         = '[Auth] Logout Error',
}

export class StateChange implements Action {
  readonly type = AuthActionTypes.STATE_CHANGE;
}

export class StateChangeSuccess implements Action {
  readonly type = AuthActionTypes.STATE_CHANGE_SUCCESS;
  constructor(public payload: User) { }
}

export class StateChangeError implements Action {
  readonly type = AuthActionTypes.STATE_CHANGE_ERROR;
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public payload: User) { }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
}

export class RegisterError implements Action {
  readonly type = AuthActionTypes.REGISTER_ERROR;
  constructor(public payload: firebase.auth.Error) { }
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: User) { }
}

export class LoginGoogle implements Action {
  readonly type = AuthActionTypes.LOGIN_GOOGLE;
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) { }
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: firebase.auth.Error) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
}

export class LogoutError implements Action {
  readonly type = AuthActionTypes.LOGOUT_ERROR;
  constructor(public payload: firebase.auth.Error) { }
}

export type AuthActions
  = StateChange
  | StateChangeSuccess
  | StateChangeError

  | Register
  | RegisterSuccess
  | RegisterError

  | Login
  | LoginGoogle
  | LoginSuccess
  | LoginError

  | Logout
  | LogoutSuccess
  | LogoutError;
