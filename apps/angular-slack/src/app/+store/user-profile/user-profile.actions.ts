import { createAction, props } from '@ngrx/store';
import { AuthError, User } from '@angular-slack/app/shared';

const BASE = '[User Profile]';

export const initProfile = createAction(
  `${BASE} Init Profile`,
);

export const starChannel = createAction(
  `${BASE} Star Channel`,
  props<{ channel: { [key: number]: boolean} }>(),
);

// update profile
export const updateProfile = createAction(
  `${BASE} Update Profile`,
  props<{ payload: { user: User, photoURL: string } }>(),
);

export const updateProfileSuccess = createAction(
  `${BASE} Update Profile Success`,
  props<{ user: User }>(),
);

export const updateProfileError = createAction(
  `${BASE} Update Profile Error`,
  props<{ error: AuthError }>(),
);

// load photo preview
export const loadPhotoPreview = createAction(
  `${BASE} Load Photo Preview`,
);

export const loadPhotoPreviewSuccess = createAction(
  `${BASE} Load Photo Preview Success`,
  props<{ photo: string | ArrayBuffer }>(),
);

export const clearPhotoPreview = createAction(
  `${BASE} Clear Photo Preview`,
);
