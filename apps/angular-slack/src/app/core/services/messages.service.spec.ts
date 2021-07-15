import { AngularFirestore } from '@angular/fire/firestore';

import {
  channel,
  error,
  message,
  message2,
  mockFireStore,
  mockNotificationService,
  mockStorageService,
  photoURL,
  spyOnCollection,
  user,
} from '@angular-slack/app/mocks';
import { AuthError, Message } from '@angular-slack/app/shared';
import { Collections } from '@libs/models';
import { MessagesService } from './messages.service';
import { NotificationService } from './notification.service';
import { StorageService } from './storage.service';
import { of } from 'rxjs';

describe('MessagesService', () => {
  let service: MessagesService;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    fireStore = mockFireStore();
    notificationService = mockNotificationService();
    storageService = mockStorageService();
    service = new MessagesService(fireStore, notificationService, storageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should return added text message', (done: DoneFn) => {
      spyOnCollection(fireStore, message);

      service.add(message).subscribe((response: Message) => {
        expect(response).toEqual(message);
        expect(storageService.uploadPhoto).not.toHaveBeenCalled();
        done();
      });
    });

    it('should return added media message', (done: DoneFn) => {
      spyOnCollection(fireStore, message);
      storageService.uploadPhoto.and.returnValue(of(photoURL));

      service.add({ ...message, media: true }).subscribe((response: Message) => {
        expect(response).toEqual({ ...message, media: true });
        expect(storageService.uploadPhoto).toHaveBeenCalled();
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      spyOnCollection(fireStore, error, Collections.Messages, true);

      service.add(message).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          done();
        },
      );
    });
  });

  describe('getByChannelId', () => {
    beforeEach(() => {
      spyOnCollection(fireStore, [message, message2], Collections.Messages);
    });

    it('should return all messages', (done: DoneFn) => {
      service.getByChannelId(channel.id).subscribe((response: Message[]) => {
        expect(response).toEqual([message, message2]);
        done();
      });
    });
  });

  describe('getPrivateByChannelId', () => {
    beforeEach(() => {
      spyOnCollection(fireStore, [message, message2], Collections.Messages);
    });

    it('should return all messages', (done: DoneFn) => {
      service.getPrivateByChannelId(channel.id, user).subscribe((response: Message[]) => {
        expect(response).toEqual([message, message2]);
        done();
      });
    });
  });

  describe('removeAll', () => {
    it('should remove all documents', async() => {
      const spy = spyOnCollection(fireStore, undefined, Collections.Messages, false, true);
      await service.removeAll(channel.id);

      expect(spy.ref.delete).toHaveBeenCalledTimes(2);
    });
  });
});
