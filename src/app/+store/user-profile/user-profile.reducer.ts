import { createReducer, on } from '@ngrx/store';

import { initialUserProfileState } from './user-profile.state';
import * as userProfileActions from './user-profile.actions';

export const userProfileReducer = createReducer(
  initialUserProfileState,
  on(userProfileActions.initProfile, state => ({ ...state, updated: false, photoURL: null })),
  on(userProfileActions.updateProfile, state => ({ ...state, updated: false, loading: true })),
  on(userProfileActions.updateProfileSuccess, state => ({ ...state, updated: true, loading: false })),
  on(userProfileActions.updateProfileError, state => ({ ...state, loading: false })),
  on(userProfileActions.loadPhotoPreview, state => ({ ...state, loading: true })),
  on(userProfileActions.loadPhotoPreviewSuccess, (state, action) => ({ ...state, loading: false, photoURL: action.photo })),
  on(userProfileActions.clearPhotoPreview, state => ({ ...state, loading: false, photoURL: null })),
);
