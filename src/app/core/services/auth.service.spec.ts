import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { mockFireAuth, mockFireStore, mockNotificationService } from 'src/app/mocks';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

describe('AuthService', () => {
  let service: AuthService;
  let fireAuth: jasmine.SpyObj<AngularFireAuth>;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    fireAuth = mockFireAuth();
    fireStore = mockFireStore();
    notificationService = mockNotificationService();
    service = new AuthService(fireAuth, fireStore, notificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
