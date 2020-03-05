import { Action } from '@ngrx/store';

import { User } from 'src/app/shared';

export enum UserProfileActionTypes {
  INIT_PROFILE               = '[User Profile] Init Profile',

  UPDATE_PROFILE             = '[User Profile] Update Profile',
  UPDATE_PROFILE_SUCCESS     = '[User Profile] Update Profile Success',
  UPDATE_PROFILE_ERROR       = '[User Profile] Update Profile Error',

  LOAD_PHOTO_PREVIEW         = '[User Profile] Load Photo Preview',
  LOAD_PHOTO_PREVIEW_SUCCESS = '[User Profile] Load Photo Preview Success',
  CLEAR_PHOTO_PREVIEW        = '[User Profile] Clear Photo Preview',
}

export class InitProfile implements Action {
  readonly type = UserProfileActionTypes.INIT_PROFILE;
}

export class UpdateProfile implements Action {
  readonly type = UserProfileActionTypes.UPDATE_PROFILE;
  constructor(public payload: { user: User, photoURL: string }) { }
}

export class UpdateProfileSuccess implements Action {
  readonly type = UserProfileActionTypes.UPDATE_PROFILE_SUCCESS;
  constructor(public payload: User) { }
}

export class UpdateProfileError implements Action {
  readonly type = UserProfileActionTypes.UPDATE_PROFILE_ERROR;
  constructor(public payload: firebase.auth.Error) { }
}

export class LoadPhotoPreview implements Action {
  readonly type = UserProfileActionTypes.LOAD_PHOTO_PREVIEW;
}

export class LoadPhotoPreviewSuccess implements Action {
  readonly type = UserProfileActionTypes.LOAD_PHOTO_PREVIEW_SUCCESS;
  constructor(public payload: string | ArrayBuffer) { }
}

export class ClearPhotoPreview implements Action {
  readonly type = UserProfileActionTypes.CLEAR_PHOTO_PREVIEW;
  constructor(public payload?: firebase.auth.Error) { }
}

export type UserProfileActions
  = InitProfile

  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileError

  | LoadPhotoPreview
  | LoadPhotoPreviewSuccess
  | ClearPhotoPreview;
