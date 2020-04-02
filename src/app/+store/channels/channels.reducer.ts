import { initialChannelsState, ChannelsState } from './channels.state';
import { ChannelsActions, ChannelsActionTypes } from './channels.actions';

export function channelsReducer(state = initialChannelsState, action: ChannelsActions): ChannelsState {
  switch (action.type) {
    case ChannelsActionTypes.ADD_CHANNEL_INIT: {
      return {
        ...state,
        added: false,
      };
    }

    case ChannelsActionTypes.ADD_CHANNEL: {
      return {
        ...state,
        added: false,
        loading: true
      };
    }

    case ChannelsActionTypes.ADD_CHANNEL_SUCCESS: {
      return {
        ...state,
        added: true,
        loading: false
      };
    }

    case ChannelsActionTypes.ADD_CHANNEL_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case ChannelsActionTypes.GET_CHANNELS_SUCCESS: {
      return {
        ...state,
        channels: [...action.payload]
      };
    }

    case ChannelsActionTypes.SELECT_CHANNEL_SUCCESS: {
      return {
        ...state,
        selected: { ...action.payload }
      };
    }

    default:
      return state;
  }
}
