import { Channel } from '@angular-slack/app/shared';

export interface ChannelsState {
  channels: Channel[];
  privateChannels: Channel[];
  starredChannels: Channel[];
  loading: boolean;
  added: boolean;
  selected: Channel;
}

export const initialChannelsState: ChannelsState = {
  channels: [],
  privateChannels: [],
  starredChannels: [],
  loading: false,
  added: false,
  selected: null,
};
