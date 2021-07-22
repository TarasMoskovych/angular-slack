import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppState } from '@angular-slack/app/+store';
import { AuthError, Channel } from '@angular-slack/app/shared';
import { Collections } from '@libs/models';
import { ChannelsService } from './channels.service';
import { NotificationService } from './notification.service';
import { MessagesService } from './messages.service';
import {
  channel,
  error,
  mockFireStore,
  mockMessagesService,
  mockNotificationService,
  mockStore,
  spyOnCollection,
  spyOnDoc,
  user,
} from '@angular-slack/app/mocks';

describe('ChannelsService', () => {
  let service: ChannelsService;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let store: jasmine.SpyObj<Store<AppState>>;
  let messagesService: jasmine.SpyObj<MessagesService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    fireStore = mockFireStore();
    messagesService = mockMessagesService();
    notificationService = mockNotificationService();
    store = mockStore();
    service = new ChannelsService(fireStore, messagesService, notificationService, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    beforeEach(() => {
      store.select.and.returnValue(of(user));
      spyOn(Date, 'now').and.returnValue(123);
    });

    it('should add new channel and return it', (done: DoneFn) => {
      spyOnCollection(fireStore, channel, Collections.Channels);

      service.add(channel).subscribe((response: Channel) => {
        expect(response).toEqual({ ...channel, id: '123', uid: user.uid });
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      spyOnCollection(fireStore, error, Collections.Channels, true);

      service.add(channel).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('get', () => {
    it('should get all channels', (done: DoneFn) => {
      spyOnCollection(fireStore, [channel], Collections.Channels);

      service.get().subscribe((response: Channel[]) => {
        expect(response).toEqual([channel]);
        done();
      });
    });
  });

  describe('getPrivate', () => {
    it('should get private channels', (done: DoneFn) => {
      spyOnCollection(fireStore, [user], Collections.Users);

      service.getPrivate().subscribe((response: Channel[]) => {
        expect(response).toEqual([{
          id: user.uid,
          name: user.displayName,
          description: null,
          uid: user.uid,
          createdBy: user,
          starred: false,
          private: true,
          status: user.status,
        }]);
        done();
      });
    });
  });

  describe('getStarred', () => {
    beforeEach(() => {
      spyOnCollection(fireStore, [channel], Collections.Channels);
    });

    it('should get all channels', (done: DoneFn) => {
      store.select.and.returnValue(of(user));

      service.getStarred().subscribe((response: Channel[]) => {
        expect(response).toEqual([channel]);
        done();
      });
    });

    it('should return empty array when user is undefined', (done: DoneFn) => {
      store.select.and.returnValue(of(undefined));

      service.getStarred().subscribe((response: Channel[]) => {
        expect(response).toEqual([]);
        done();
      });
    });
  });

  describe('update', () => {
    it('should return updated channel', (done: DoneFn) => {
      const payload = { name: channel.name, description: channel.description } as Channel;
      spyOnCollection(fireStore, payload);
      spyOnDoc(fireStore);

      service.update(channel).subscribe((response: Channel) => {
        expect(response).toEqual(channel);
        done();
      });
    });

    it('should return null if channel does not exist', (done: DoneFn) => {
      spyOnCollection(fireStore, null);
      spyOnDoc(fireStore);

      service.update(channel).subscribe((response: Channel) => {
        expect(response).toBeNull();
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      spyOnCollection(fireStore, error, Collections.Channels, true);

      service.update(channel).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('remove', () => {
    it('should return removed channel', (done: DoneFn) => {
      spyOnCollection(fireStore, channel);
      spyOnDoc(fireStore);

      service.remove(channel).subscribe(() => {
        expect(fireStore.doc).toHaveBeenCalledTimes(1);
        expect(messagesService.removeAll).toHaveBeenCalledOnceWith(channel.id);
        done();
      });
    });

    it('should return null if removed channel does not exist', (done: DoneFn) => {
      spyOnCollection(fireStore, null);
      spyOnDoc(fireStore);

      service.remove(channel).subscribe((response: any) => {
        expect(response).toBeNull();
        expect(messagesService.removeAll).not.toHaveBeenCalled();
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      spyOnCollection(fireStore, error, Collections.Channels, true);

      service.remove(channel).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });
});
