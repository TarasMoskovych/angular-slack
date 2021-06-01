import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/+store';
import { mockFireStore, mockNotificationService, mockStore } from 'src/app/mocks';
import { ChannelsService } from './channels.service';
import { NotificationService } from './notification.service';

describe('ChannelsService', () => {
  let service: ChannelsService;
  let fireStore: jasmine.SpyObj<AngularFirestore>;
  let store: jasmine.SpyObj<Store<AppState>>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    fireStore = mockFireStore();
    notificationService = mockNotificationService();
    store = mockStore();
    service = new ChannelsService(fireStore, notificationService, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
