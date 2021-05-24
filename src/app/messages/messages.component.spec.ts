
import { of } from 'rxjs';

import {
  authUserSelector,
  channelsSelectedSelector,
  getMessages,
  messagesSelector,
  selectedStarredSelector,
  starChannel,
  starredChannelsLengthSelector
} from '../+store';
import { channel, message, mockStore, user } from '../mock';
import { Channel, Message, User } from '../shared';
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let store: jasmine.SpyObj<any>;

  beforeEach(() => {
    store = mockStore();
    component = new MessagesComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      store.select
        .withArgs(channelsSelectedSelector).and.returnValue(of(channel))
        .withArgs(selectedStarredSelector).and.returnValue(of(true))
        .withArgs(messagesSelector).and.returnValue(of([message]))
        .withArgs(starredChannelsLengthSelector).and.returnValue(of(10))
        .withArgs(authUserSelector).and.returnValue(of(user));

      component.ngOnInit();
    });

    it('should return channel on channel$ subscribe and call getMessages', () => {
      component.channel$.subscribe((value: Channel) => {
        expect(value).toEqual(channel);
        expect(store.dispatch).toHaveBeenCalledOnceWith(getMessages({ channelId: channel.id }));
      });
    });

    it('should return true on isStarred$ subscribe', () => {
      component.isStarred$.subscribe((value: boolean) => {
        expect(value).toBeTrue();
      });
    });

    it('should return messages list on messages$ subscribe', () => {
      component.messages$.subscribe((value: Message[]) => {
        expect(value).toEqual([message]);
      });
    });

    it('should return number of starred channels on starredChannelsLength$ subscribe', () => {
      component.starredChannelsLength$.subscribe((value: number) => {
        expect(value).toBe(10);
      });
    });

    it('should return user on user$ subscribe', () => {
      component.user$.subscribe((value: User) => {
        expect(value).toEqual(user);
      });
    });
  });

  describe('onStar', () => {
    it('should dispatch starChannel with correct payload', () => {
      component.onStar({ channel, starred: false });
      expect(store.dispatch).toHaveBeenCalledOnceWith(starChannel({ channel: { [channel.id]: false } }));
    });
  });

  describe('onMessageAdd', () => {
    it('should dispatch addMessage with correct payload', () => {
      component.onMessageAdd({ type: 'text', value: message.content }, channel.id, user);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('onToggleEmoji', () => {
    it('should update showEmoji based on the value', () => {
      component.onToggleEmoji(true);
      expect(component.showEmoji).toBeTrue();
    });
  });
});
