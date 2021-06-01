import { channel, user } from 'src/app/mocks';

import * as ChannelsSelectors from './channels.selectors';
import { initialChannelsState } from './channels.state';

describe('ChannelsSelectors', () => {
  describe('channelsAddedSelector', () => {
    it('should return correct value', () => {
      expect(ChannelsSelectors.channelsAddedSelector.projector({ ...initialChannelsState, added: true })).toBe(true);
    });
  });

  describe('channelsLoadingSelector', () => {
    it('should return correct value', () => {
      expect(ChannelsSelectors.channelsLoadingSelector.projector({ ...initialChannelsState, loading: false })).toBe(false);
    });
  });

  describe('channelsSelector', () => {
    it('should return correct value', () => {
      expect(ChannelsSelectors.channelsSelector.projector({ ...initialChannelsState, channels: [channel] })).toEqual([channel]);
    });
  });

  describe('starredChannelsSelector', () => {
    it('should return correct value', () => {
      expect(ChannelsSelectors.starredChannelsSelector.projector({ ...initialChannelsState, starredChannels: [channel] })).toEqual([channel]);
    });
  });

  describe('channelsSelectedSelector', () => {
    it('should return correct value', () => {
      expect(
        ChannelsSelectors.channelsSelectedSelector.projector({ ...initialChannelsState, selected: channel })
      ).toEqual(channel);
    });
  });

  describe('selectedStarredSelector', () => {
    it('should return true', () => {
      expect(ChannelsSelectors.selectedStarredSelector.projector(user, channel)).toBe(true);
    });

    it('should return false when starred is null', () => {
      expect(ChannelsSelectors.selectedStarredSelector.projector(user, null)).toBe(false);
    });

    it('should return falsy when user is null', () => {
      expect(ChannelsSelectors.selectedStarredSelector.projector(null, channel)).toBeFalsy();
    });
  });

  describe('starredChannelsLengthSelector', () => {
    it('should return correct value', () => {
      expect(
        ChannelsSelectors.starredChannelsLengthSelector.projector([channel])
      ).toBe(1);
    });
  });
});
