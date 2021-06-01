import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/+store';
import { mockAuthService, mockFireStorage, mockFireStore, mockNotificationService, mockStore } from 'src/app/mocks';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { UserProfileService } from './user-profile.service';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let fireStorage: jasmine.SpyObj<AngularFireStorage>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    fireStore = mockFireStore();
    fireStorage = mockFireStorage();
    authService = mockAuthService();
    notificationService = mockNotificationService();
    store = mockStore();
    service = new UserProfileService(fireStore, fireStorage, authService, notificationService, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
