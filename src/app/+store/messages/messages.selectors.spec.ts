import { message } from 'src/app/mock';
import * as messagesSelectors from './messages.selectors';
import { initialMessagesState } from './messages.state';

describe('MessagesSelectors', () => {
  describe('messagesSelector', () => {
    it('should return correct value', () => {
      expect(messagesSelectors.messagesSelector.projector({ ...initialMessagesState, messages: [message] })).toEqual([message]);
    });
  });
});
