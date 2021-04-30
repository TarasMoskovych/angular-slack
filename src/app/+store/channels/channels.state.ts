import { Channel } from 'src/app/shared';

export interface ChannelsState {
  channels: Channel[];
  starredChannels: Channel[];
  loading: boolean;
  added: boolean;
  selected: Channel;
}

export const initialChannelsState: ChannelsState = {
  channels: [],
  starredChannels: [],
  loading: false,
  added: false,
  selected: null,
};
