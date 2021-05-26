import { channel, error } from 'src/app/mock';
import * as ChannelsActions from './channels.actions';
import { channelsReducer } from './channels.reducer';
import { initialChannelsState } from './channels.state';

describe('channelsReducer', () => {
  describe('default', () => {
    it('should return default state', () => {
      const state = channelsReducer(undefined, {} as any);
      expect(state).toBe(initialChannelsState);
    });
  });

  describe('addChannelInit', () => {
    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.addChannelInit());
      expect(state).toEqual({ ...initialChannelsState, added: false });
    });
  });

  describe('addChannel', () => {
    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.addChannel({ channel }));
      expect(state).toEqual({ ...initialChannelsState, added: false, loading: true });
    });
  });

  describe('addChannelSuccess', () => {
    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.addChannelSuccess({ channel }));
      expect(state).toEqual({ ...initialChannelsState, added: true, loading: false, selected: channel });
    });
  });

  describe('addChannelError', () => {
    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.addChannelError({ error }));
      expect(state).toEqual({ ...initialChannelsState, loading: false });
    });
  });

  describe('getChannelsSuccess', () => {
    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.getChannelsSuccess({ channels: [channel] }));
      expect(state).toEqual({ ...initialChannelsState, channels: [channel] });
    });
  });

  describe('getStarredChannelsSuccess', () => {
    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.getStarredChannelsSuccess({ channels: [channel] }));
      expect(state).toEqual({ ...initialChannelsState, starredChannels: [channel] });
    });
  });

  describe('selectChannelSuccess', () => {
    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.selectChannelSuccess({ channel }));
      expect(state).toEqual({ ...initialChannelsState, selected: channel });
    });
  });

  describe('removeChannelSuccess', () => {
    it('should return correct state and set selected channel to null', () => {
      const state = channelsReducer({ ...initialChannelsState, selected: channel }, ChannelsActions.removeChannelSuccess({ channel }));
      expect(state).toEqual({ ...initialChannelsState, selected: null });
    });

    it('should return correct state', () => {
      const state = channelsReducer(initialChannelsState, ChannelsActions.removeChannelSuccess({ channel }));
      expect(state).toEqual({ ...initialChannelsState, selected: null });
    });
  });
});
