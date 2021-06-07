import { message } from 'src/app/mocks';
import * as messagesActions from './messages.actions';
import { messagesReducer } from './messages.reducer';
import { initialMessagesState } from './messages.state';

describe('messagesReducer', () => {
  describe('default', () => {
    it('should return default state', () => {
      const state = messagesReducer(undefined, {} as any);
      expect(state).toBe(initialMessagesState);
    });
  });

  describe('getMessagesSuccess', () => {
    it('should return correct state', () => {
      const state = messagesReducer(initialMessagesState, messagesActions.getMessagesSuccess({ messages: [message] }));
      expect(state).toEqual({ ...initialMessagesState, messages: [message] });
    });
  });

  describe('searchMessages', () => {
    it('should return correct state', () => {
      const state = messagesReducer(initialMessagesState, messagesActions.searchMessages({ search: 'test' }));
      expect(state).toEqual({ ...initialMessagesState, search: 'test' });
    });
  });
});
