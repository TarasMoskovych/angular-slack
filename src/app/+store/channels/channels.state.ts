import { Channel } from 'src/app/shared';

export interface ChannelsState {
  channels: Channel[];
  loading: boolean;
  added: boolean;
  selected: Channel;
}

export const initialChannelsState: ChannelsState = {
  channels: [],
  loading: false,
  added: false,
  selected: null,
};
