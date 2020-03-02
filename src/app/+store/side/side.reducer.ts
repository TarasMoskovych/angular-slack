import { SideState, initialSideState } from './side.state';
import { SideActions } from './side.actions';

export function sideReducer(state = initialSideState, action: SideActions): SideState {
  switch (action.type) {
    default:
      return state;
  }
}
