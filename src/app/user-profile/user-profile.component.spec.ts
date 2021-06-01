import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AuthState, logout } from '../+store';
import { mockStore, user } from '../mocks';
import { User } from '../shared';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let store: jasmine.SpyObj<Store<AuthState>>;

  beforeEach(() => {
    store = mockStore();
    component = new UserProfileComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      store.select.and.returnValue(of(user));
    });

    it('should get user from the store', () => {
      component.ngOnInit();
      component.user$.subscribe((response: User) => {
        expect(response).toEqual(user);
      });
    });
  });

  describe('onLogout', () => {
    it('should dispatch the correct action', () => {
      component.onLogout();
      expect(store.dispatch).toHaveBeenCalledOnceWith(logout());
    });
  });
});
