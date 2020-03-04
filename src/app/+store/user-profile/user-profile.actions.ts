import { Action } from '@ngrx/store';

import { User } from 'src/app/shared';

export enum UserProfileActionTypes {
  INIT                       = '[User Profile] Init',
  UPDATE                     = '[User Profile] Update',
  UPDATE_SUCCESS             = '[User Profile] Update Success',
  UPDATE_ERROR               = '[User Profile] Update Error',

  LOAD_PHOTO_PREVIEW         = '[User Profile] Load Photo Preview',
  LOAD_PHOTO_PREVIEW_SUCCESS = '[User Profile] Load Photo Preview Success',
  CLEAR_PHOTO_PREVIEW        = '[User Profile] Clear Photo Preview',
}

export class Init implements Action {
  readonly type = UserProfileActionTypes.INIT;
}

export class Update implements Action {
  readonly type = UserProfileActionTypes.UPDATE;
  constructor(public payload: { user: User, photoURL: string }) { }
}

export class UpdateSuccess implements Action {
  readonly type = UserProfileActionTypes.UPDATE_SUCCESS;
  constructor(public payload: User) { }
}

export class UpdateError implements Action {
  readonly type = UserProfileActionTypes.UPDATE_ERROR;
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
  = Init

  |Update
  | UpdateSuccess
  | UpdateError

  | LoadPhotoPreview
  | LoadPhotoPreviewSuccess
  | ClearPhotoPreview;
