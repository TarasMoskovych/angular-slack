
import { of } from 'rxjs';

import {
  authUserSelector,
  channelsSelectedSelector,
  getMessages,
  filteredMessagesSelector,
  searchMessages,
  searchSelector,
  selectedStarredSelector,
  starChannel,
  starredChannelsLengthSelector,
  getPrivateMessages,
  numberOfUsersSelector,
} from '../+store';
import { StorageService, VideoCallService } from '../core';
import { channel, message, mockStorageService, mockStore, mockVideoCallService, user } from '../mocks';
import { Channel, Message, User } from '../shared';
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let store: jasmine.SpyObj<any>;
  let storageService: jasmine.SpyObj<StorageService>;
  let videoCallService: jasmine.SpyObj<VideoCallService>;
  const search = 'test';
  const mockStoreSelect = (storeArg: jasmine.SpyObj<any>, ch: Channel) => {
    storeArg.select
      .withArgs(channelsSelectedSelector).and.returnValue(of(ch))
      .withArgs(selectedStarredSelector).and.returnValue(of(true))
      .withArgs(filteredMessagesSelector).and.returnValue(of([message]))
      .withArgs(searchSelector).and.returnValue(of(search))
      .withArgs(starredChannelsLengthSelector).and.returnValue(of(10))
      .withArgs(authUserSelector).and.returnValue(of(user))
      .withArgs(numberOfUsersSelector).and.returnValue(of(2));
  };

  beforeEach(() => {
    store = mockStore();
    storageService = mockStorageService();
    videoCallService = mockVideoCallService();
    component = new MessagesComponent(store, storageService, videoCallService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    describe('public channel', () => {
      beforeEach(() => {
        mockStoreSelect(store, channel);
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

      it('should return search value on searchTerm$ subscribe', () => {
        component.searchTerm$.subscribe((value: string) => {
          expect(value).toBe(search);
        });
      });

      it('should return progress on progress$ subscribe', () => {
        component.progress$.subscribe((value: number) => {
          expect(value).toEqual(50);
        });
      });

      it('should return user on user$ subscribe', () => {
        component.user$.subscribe((value: User) => {
          expect(value).toEqual(user);
        });
      });

      it('should return number of users on users$ subscribe', () => {
        component.users$.subscribe((value: number) => {
          expect(value).toBe(2);
        });
      });
    });

    describe('private channel', () => {
      beforeEach(() => {
        mockStoreSelect(store, { ...channel, private: true });
        component.ngOnInit();
      });

      it('should return channel on channel$ subscribe and call getPrivateMessages', () => {
        component.channel$.subscribe((value: Channel) => {
          expect(value).toEqual({ ...channel, private: true });
          expect(store.dispatch).toHaveBeenCalledOnceWith(getPrivateMessages({ channelId: channel.id }));
        });
      });
    });

    describe('undefined channel', () => {
      beforeEach(() => {
        mockStoreSelect(store, undefined);
        component.ngOnInit();
      });

      it('should not call get messages', () => {
        component.channel$.subscribe(() => {
          expect(store.dispatch).not.toHaveBeenCalledOnceWith(getMessages({ channelId: channel.id }));
          expect(store.dispatch).not.toHaveBeenCalledOnceWith(getPrivateMessages({ channelId: channel.id }));
        });
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
      component.onMessageAdd({ media: false, value: message.content }, channel.id, user);
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  describe('onToggleEmoji', () => {
    it('should update showEmoji based on the value', () => {
      component.onToggleEmoji(true);
      expect(component.showEmoji).toBeTrue();
    });
  });

  describe('onSearch', () => {
    it('should dispatch searchMessages with correct payload', () => {
      component.onSearch('test');
      expect(store.dispatch).toHaveBeenCalledOnceWith(searchMessages({ search }));
    });
  });

  describe('onCall', () => {
    it('should invoke "call" method with channel', () => {
      component.onCall(channel);
      expect(videoCallService.call).toHaveBeenCalledWith(channel);
    });
  });
});
