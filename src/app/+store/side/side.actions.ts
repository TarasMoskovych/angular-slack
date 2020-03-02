import { Action } from '@ngrx/store';

import { User } from 'src/app/shared';

export enum SideActionTypes {
  UPDATE_PROFILE_PHOTO         = '[Side] Update Profile Photo',
  UPDATE_PROFILE_PHOTO_SUCCESS = '[Side] Update Profile Photo Success',
  UPDATE_PROFILE_PHOTO_ERROR   = '[Side] Update Profile Photo Error',
}

export class UpdateProfilePhoto implements Action {
  readonly type = SideActionTypes.UPDATE_PROFILE_PHOTO;
  constructor(public payload: { user: User, photoURL: string }) { }
}

export class UpdateProfilePhotoSuccess implements Action {
  readonly type = SideActionTypes.UPDATE_PROFILE_PHOTO_SUCCESS;
}

export class UpdateProfilePhotoError implements Action {
  readonly type = SideActionTypes.UPDATE_PROFILE_PHOTO_ERROR;
  constructor(public payload: firebase.auth.Error) { }
}

export type SideActions
  = UpdateProfilePhoto
  | UpdateProfilePhotoSuccess
  | UpdateProfilePhotoError;
