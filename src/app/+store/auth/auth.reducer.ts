import { AuthState, initialAuthState } from './auth.state';
import { AuthActions, AuthActionTypes } from './auth.actions';

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.STATE_CHANGE: {
      return {
        ...state,
      };
    }

    case AuthActionTypes.STATE_CHANGE_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }

    case AuthActionTypes.STATE_CHANGE_ERROR: {
      return {
        ...state,
        user: null
      };
    }

    case AuthActionTypes.STATE_CHANGE_SUCCESS: {
      return {
        ...state,
      };
    }

    case AuthActionTypes.REGISTER: {
      return {
        ...state,
        loading: true
      };
    }

    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case AuthActionTypes.REGISTER_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        loading: true
      };
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    }

    case AuthActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
}
