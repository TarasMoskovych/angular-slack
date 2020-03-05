import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';

const getPhotoPreview = (state: UserProfileState) => state.photoURL;
const getLoading = (state: UserProfileState) => state.loading;
const getUpdated = (state: UserProfileState) => state.updated;

export const getUserProfileState = createFeatureSelector<UserProfileState>('user-profile');
export const userProfilePhotoPreviewSelector = createSelector(getUserProfileState, getPhotoPreview);
export const userProfileLoadingSelector = createSelector(getUserProfileState, getLoading);
export const userProfileUpdatedSelector = createSelector(getUserProfileState, getUpdated);
