import { AngularFirestore } from '@angular/fire/firestore';

import { mockFireStore, mockNotificationService } from 'src/app/mocks';
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
});
