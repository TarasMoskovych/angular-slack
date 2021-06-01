import * as ChannelsActions from './channels.actions';
import { channel, error } from 'src/app/mocks';

describe('ChannelsActions', () => {
  describe('addChannelInit', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.addChannelInit();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Add Channel Init');
    });
  });

  describe('addChannel', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.addChannel({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Add Channel');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('addChannelSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.addChannelSuccess({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Add Channel Success');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('addChannelError', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.addChannelError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Add Channel Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('getChannels', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.getChannels();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Get Channels');
    });
  });

  describe('getChannelsSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.getChannelsSuccess({ channels: [channel] });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Get Channels Success');
    });

    it('should have correct payload', () => {
      expect(result.channels).toEqual([channel]);
    });
  });

  describe('getChannelsError', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.getChannelsError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Get Channels Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('getStarredChannels', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.getStarredChannels();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Get Starred Channels');
    });
  });

  describe('getStarredChannelsSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.getStarredChannelsSuccess({ channels: [channel] });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Get Starred Channels Success');
    });

    it('should have correct payload', () => {
      expect(result.channels).toEqual([channel]);
    });
  });

  describe('getStarredChannelsError', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.getStarredChannelsError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Get Starred Channels Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('selectChannel', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.selectChannel({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Select Channel');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('selectChannelSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.selectChannelSuccess({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Select Channel Success');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('selectChannelError', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.selectChannelError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Select Channel Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('updateChannel', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.updateChannel({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Update Channel');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('updateChannelSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.updateChannelSuccess({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Update Channel Success');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('updateChannelError', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.updateChannelError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Update Channel Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('removeChannel', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.removeChannel({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Remove Channel');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('removeChannelSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.removeChannelSuccess({ channel });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Remove Channel Success');
    });

    it('should have correct payload', () => {
      expect(result.channel).toEqual(channel);
    });
  });

  describe('removeChannelError', () => {
    let result: any;

    beforeAll(() => {
      result = ChannelsActions.removeChannelError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Channels] Remove Channel Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });
});
