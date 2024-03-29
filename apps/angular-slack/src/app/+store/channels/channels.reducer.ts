import { createReducer, on } from '@ngrx/store';

import { initialChannelsState } from './channels.state';
import * as channelsActions from './channels.actions';

export const channelsReducer = createReducer(
  initialChannelsState,
  on(channelsActions.addChannelInit, state => ({ ...state, added: false })),
  on(channelsActions.addChannel, state => ({ ...state, added: false, loading: true })),
  on(channelsActions.addChannelSuccess, (state, action) => ({ ...state, added: true, loading: false, selected: { ...action.channel } })),
  on(channelsActions.addChannelError, state => ({ ...state, loading: false })),
  on(channelsActions.updateChannel, (state, action) => ({ ...state, selected: { ...action.channel } })),
  on(channelsActions.getChannelsSuccess, (state, action) => ({ ...state, channels: [...action.channels] })),
  on(channelsActions.getStarredChannelsSuccess, (state, action) => ({ ...state, starredChannels: [...action.channels] })),
  on(channelsActions.getPrivateChannelsSuccess, (state, action) => ({ ...state, privateChannels: [...action.channels] })),
  on(channelsActions.selectChannelSuccess, (state, action) => ({ ...state, selected: { ...action.channel } })),
  on(channelsActions.removeChannelSuccess, (state, action) => {
    if (state.selected?.id === action.channel.id) {
      return { ...state, selected: null };
    }
    return { ...state };
  }),
);
