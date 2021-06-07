import { message2, message, user } from 'src/app/mocks';
import { Poster } from 'src/app/shared';
import * as messagesSelectors from './messages.selectors';
import { initialMessagesState } from './messages.state';

describe('MessagesSelectors', () => {
  describe('messagesSelector', () => {
    it('should return correct value', () => {
      expect(messagesSelectors.messagesSelector.projector({ ...initialMessagesState, messages: [message] })).toEqual([message]);
    });
  });

  describe('searchSelector', () => {
    it('should return correct value', () => {
      expect(messagesSelectors.searchSelector.projector({ ...initialMessagesState, search: 'test' })).toEqual('test');
    });
  });

  describe('topPostersSelector', () => {
    it('should return correct value', () => {
      const { displayName, photoURL } = user;
      const expected: Poster[] = [
        {
          displayName,
          length: 2,
          photoURL,
        },
        {
          displayName,
          length: 1,
          photoURL,
        }
      ];
      expect(messagesSelectors.topPostersSelector.projector([message2, message, message])).toEqual(expected);
    });
  });

  describe('filteredMessagesSelector', () => {
    it('should return correct value', () => {
      expect(messagesSelectors.filteredMessagesSelector.projector([message, message2], '2')).toEqual([message2]);
    });
  });
});
