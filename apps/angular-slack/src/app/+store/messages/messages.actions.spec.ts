import * as messagesActions from './messages.actions';
import { message, error, channel } from '@angular-slack/app/mocks';

describe('MessagesActions', () => {
  describe('addMessage', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.addMessage({ message });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Add Message');
    });

    it('should have correct payload', () => {
      expect(result.message).toEqual(message);
    });
  });

  describe('addMessageSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.addMessageSuccess();
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Add Message Success');
    });
  });

  describe('addMessageError', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.addMessageError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Add Message Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('getMessages', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.getMessages({ channelId: channel.id });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Get Messages');
    });

    it('should have correct payload', () => {
      expect(result.channelId).toBe(channel.id);
    });
  });

  describe('getMessagesSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.getMessagesSuccess({ messages: [message] });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Get Messages Success');
    });

    it('should have correct payload', () => {
      expect(result.messages).toEqual([message]);
    });
  });

  describe('getMessagesError', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.getMessagesError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Get Messages Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('getPrivateMessages', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.getPrivateMessages({ channelId: channel.id });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Get Private Messages');
    });

    it('should have correct payload', () => {
      expect(result.channelId).toBe(channel.id);
    });
  });

  describe('getPrivateMessagesSuccess', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.getPrivateMessagesSuccess({ messages: [message] });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Get Private Messages Success');
    });

    it('should have correct payload', () => {
      expect(result.messages).toEqual([message]);
    });
  });

  describe('getPrivateMessagesError', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.getPrivateMessagesError({ error });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Get Private Messages Error');
    });

    it('should have correct payload', () => {
      expect(result.error).toEqual(error);
    });
  });

  describe('searchMessages', () => {
    let result: any;

    beforeAll(() => {
      result = messagesActions.searchMessages({ search: 'test' });
    });

    it('should have correct type', () => {
      expect(result.type).toBe('[Messages] Search Messages');
    });

    it('should have correct payload', () => {
      expect(result.search).toEqual('test');
    });
  });
});
