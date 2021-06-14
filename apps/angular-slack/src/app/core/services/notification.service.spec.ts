import { MatSnackBar } from '@angular/material/snack-bar';

import { mockSnackBar } from '@angular-slack/app/mocks';
import { AuthError } from '@angular-slack/app/shared';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  const msg = 'test message';

  beforeEach(() => {
    snackBar = mockSnackBar();
    service = new NotificationService(snackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    beforeEach(() => {
      spyOn(service, 'show');
    });

    it('should call show method and throw an error', (done: DoneFn) => {
      service.handleError({ message: msg } as AuthError)
        .subscribe(
          () => fail(),
          (err: AuthError) => {
            expect(err.message).toBe(msg);
            done();
          },
        );
    });

    afterEach(() => {
      expect(service.show).toHaveBeenCalledOnceWith(msg);
    });
  });

  describe('show', () => {
    it('should open snackbar with message and default action', () => {
      service.show(msg);
      expect(snackBar.open).toHaveBeenCalledOnceWith(msg, 'Close', { duration: 2000 });
    });

    it('should open snackbar with message and custom action', () => {
      service.show(msg, 'Ok');
      expect(snackBar.open).toHaveBeenCalledOnceWith(msg, 'Ok', { duration: 2000 });
    });
  });
});
