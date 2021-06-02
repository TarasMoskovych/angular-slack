import { AngularFirestore } from '@angular/fire/firestore';

import { channel, error, message, message2, mockFireStore, mockNotificationService, spyOnCollection } from 'src/app/mocks';
import { AuthError, Collections, Message } from 'src/app/shared';
import { MessagesService } from './messages.service';
import { NotificationService } from './notification.service';

describe('MessagesService', () => {
  let service: MessagesService;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    fireStore = mockFireStore();
    notificationService = mockNotificationService();
    service = new MessagesService(fireStore, notificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should return added message', () => {
      spyOnCollection(fireStore, message);

      service.add(message).subscribe((response: Message) => {
        expect(response).toEqual(message);
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
});
