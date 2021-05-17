import * as messagesActions from './messages.actions';
import { message, error, channel } from 'src/app/mock';

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
});
