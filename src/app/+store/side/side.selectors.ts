import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SideState } from './side.state';

const getPhotoPreview = (state: SideState) => state.photoURL;

export const getSideState = createFeatureSelector<SideState>('side');
export const sidePhotoPreviewSelector = createSelector(getSideState, getPhotoPreview);
