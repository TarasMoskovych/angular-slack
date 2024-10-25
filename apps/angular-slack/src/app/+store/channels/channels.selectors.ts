import { Channel } from '@angular-slack/app/shared';
import { Status, User } from '@libs/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authUserSelector } from '../auth';
import { ChannelsState } from './channels.state';

const getAdded = (state: ChannelsState) => state.added;
const getLoading = (state: ChannelsState) => state.loading;
const getChannels = (state: ChannelsState) => state.channels;
const getStarredChannels = (state: ChannelsState) => state.starredChannels;
const getSelected = (state: ChannelsState) => state.selected;

export const getChannelsState = createFeatureSelector<ChannelsState>('channels');
export const channelsAddedSelector = createSelector(getChannelsState, getAdded);
export const channelsLoadingSelector = createSelector(getChannelsState, getLoading);
export const channelsSelector = createSelector(getChannelsState, getChannels);
export const starredChannelsSelector = createSelector(getChannelsState, getStarredChannels);
export const privateChannelsSelector = createSelector(
  getChannelsState,
  authUserSelector,
  (state: ChannelsState, user: User) => state.privateChannels
    .filter((channel: Channel) => channel.uid !== user?.uid)
    .sort((a: Channel, b: Channel) => {
      if (a.status === Status.ONLINE && b.status !== Status.ONLINE) {
        return -1;
      } else if (a.status !== Status.ONLINE && b.status === Status.ONLINE) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    }),
);
export const channelsSelectedSelector = createSelector(getChannelsState, getSelected);
export const selectedStarredSelector = createSelector(
  authUserSelector,
  channelsSelectedSelector,
  (user: User, selected: Channel) => user?.starredChannels?.includes(selected?.id),
);
export const starredChannelsLengthSelector = createSelector(
  starredChannelsSelector,
  (channels: Channel[]) => channels.length,
);
