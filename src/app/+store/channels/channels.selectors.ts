import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChannelsState } from './channels.state';

const getAdded = (state: ChannelsState) => state.added;
const getLoading = (state: ChannelsState) => state.loading;
const getChannels = (state: ChannelsState) => state.channels;
const getSelected = (state: ChannelsState) => state.selected;

export const getChannelsState = createFeatureSelector<ChannelsState>('channels');
export const channelsAddedSelector = createSelector(getChannelsState, getAdded);
export const channelsLoadingSelector = createSelector(getChannelsState, getLoading);
export const channelsSelector = createSelector(getChannelsState, getChannels);
export const channelsSelectedSelector = createSelector(getChannelsState, getSelected);
