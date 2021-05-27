import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppState } from 'src/app/+store';
import { mockRouter, mockStore, user } from 'src/app/mock';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: jasmine.SpyObj<Router>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    router = mockRouter();
    store = mockStore();
    guard = new AuthGuard(router, store);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true when user is defined', (done: DoneFn) => {
      store.select.and.returnValue(of(user));

      guard.canActivate().subscribe((value: boolean) => {
        expect(value).toBeTrue();
        done();
      });
    });

    it('should return false when user is not defined and redirect to login', (done: DoneFn) => {
      store.select.and.returnValue(of(undefined));

      guard.canActivate().subscribe((value: boolean) => {
        expect(value).toBeFalse();
        expect(router.navigate).toHaveBeenCalledOnceWith(['login']);
        done();
      });
    });
  });
});
