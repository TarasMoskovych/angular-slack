import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';

import * as messagesActions from './messages.actions';
import * as channelsActions from 'src/app/+store/channels';
import { MessagesService } from 'src/app/core';
import { channel, error, message } from 'src/app/mocks';
import { MessagesEffects } from './messages.effects';

describe('MessagesEffects', () => {
  const messagesServiceSpy: jasmine.SpyObj<MessagesService> = jasmine.createSpyObj('ChannelsService', [
    'add',
    'getByChannelId',
  ]);

  describe('add$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: messagesActions.addMessage.type,
        message,
      }));
    });

    it('should return correct action type when success', () => {
      messagesServiceSpy.add.and.returnValue(of(undefined));
      const effects = new MessagesEffects(actions$, messagesServiceSpy);

      effects.add$.subscribe(action => {
        expect(action.type).toBe(messagesActions.addMessageSuccess.type);
      });
    });

    it('should return correct data when error', () => {
      messagesServiceSpy.add.and.returnValue(throwError(error));
      const effects = new MessagesEffects(actions$, messagesServiceSpy);

      effects.add$.subscribe((action: any) => {
        expect(action.type).toBe(messagesActions.addMessageError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('get$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of({
        type: messagesActions.getMessages.type,
        channelId: channel.id,
      }));
    });

    it('should return correct action type when success', () => {
      messagesServiceSpy.getByChannelId.and.returnValue(of([message]));
      const effects = new MessagesEffects(actions$, messagesServiceSpy);

      effects.get$.subscribe((action: any) => {
        expect(action.type).toBe(messagesActions.getMessagesSuccess.type);
        expect(action.messages).toEqual([message]);
      });
    });

    it('should return correct data when error', () => {
      messagesServiceSpy.getByChannelId.and.returnValue(throwError(error));
      const effects = new MessagesEffects(actions$, messagesServiceSpy);

      effects.get$.subscribe((action: any) => {
        expect(action.type).toBe(messagesActions.getMessagesError.type);
        expect(action.error).toEqual(error);
      });
    });
  });

  describe('selectChannelSuccess$', () => {
    let actions$: Actions;

    beforeAll(() => {
      actions$ = new Actions(of(channelsActions.selectChannelSuccess));
    });

    it('should return correct action type when success', () => {
      const effects = new MessagesEffects(actions$, messagesServiceSpy);

      effects.selectChannelSuccess$.subscribe((action: any) => {
        expect(action.type).toBe(messagesActions.searchMessages.type);
        expect(action.search).toBe('');
      });
    });
  });
});
