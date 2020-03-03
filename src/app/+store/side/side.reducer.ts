import { SideState, initialSideState } from './side.state';
import { SideActions, SideActionTypes } from './side.actions';

export function sideReducer(state = initialSideState, action: SideActions): SideState {
  switch (action.type) {
    case SideActionTypes.LOAD_PHOTO_SUCCESS: {
      return {
        ...state,
        photoURL: action.payload
      };
    }

    case SideActionTypes.LOAD_PHOTO_ERROR: {
      return {
        ...state,
        photoURL: null
      };
    }

    default:
      return state;
  }
}
