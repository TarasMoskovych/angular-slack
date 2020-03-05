import { UserProfileState, initialUserProfileState } from './user-profile.state';
import { UserProfileActionTypes, UserProfileActions } from './user-profile.actions';

export function userProfileReducer(state = initialUserProfileState, action: UserProfileActions): UserProfileState {
  switch (action.type) {
    case UserProfileActionTypes.INIT_PROFILE: {
      return {
        ...state,
        updated: false,
        photoURL: null
      };
    }

    case UserProfileActionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        loading: true,
        updated: false
      };
    }

    case UserProfileActionTypes.LOAD_PHOTO_PREVIEW: {
      return {
        ...state,
        loading: true
      };
    }

    case UserProfileActionTypes.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        updated: true,
      };
    }

    case UserProfileActionTypes.UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case UserProfileActionTypes.LOAD_PHOTO_PREVIEW_SUCCESS: {
      return {
        ...state,
        photoURL: action.payload,
        loading: false
      };
    }

    case UserProfileActionTypes.CLEAR_PHOTO_PREVIEW: {
      return {
        ...state,
        photoURL: null,
        loading: false
      };
    }

    default:
      return state;
  }
}
