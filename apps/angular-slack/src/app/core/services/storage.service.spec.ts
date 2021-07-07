import { b64Data, error, mockFireStorage, mockNotificationService, photoURL } from '@angular-slack/app/mocks';
import { AuthError } from '@angular-slack/app/shared';
import { AngularFireStorage } from '@angular/fire/storage';
import { NotificationService } from './notification.service';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  const path = '/path';
  let service: StorageService;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let fireStorage: jasmine.SpyObj<AngularFireStorage>;

  beforeEach(() => {
    notificationService = mockNotificationService();
    fireStorage = mockFireStorage();
    service = new StorageService(notificationService, fireStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('uploadPhoto', () => {
    it('should return photo url', (done: DoneFn) => {
      fireStorage.upload.and.resolveTo({ ref: { getDownloadURL: () => Promise.resolve(photoURL) }} as any);

      service.uploadPhoto(path, b64Data).subscribe((url: string) => {
        expect(url).toBe(photoURL);
        done();
      });
    });

    it('should handle an error', (done: DoneFn) => {
      fireStorage.upload.and.resolveTo({ ref: { getDownloadURL: () => Promise.reject(error) }} as any);

      service.uploadPhoto(path, b64Data).subscribe(
        () => fail(),
        (err: AuthError) => {
          expect(err.message).toBe(error.message);
          expect(notificationService.handleError).toHaveBeenCalledWith(error);
          done();
        },
      );
    });
  });
});
