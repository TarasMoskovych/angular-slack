import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AuthState, register } from '@angular-slack/app/+store';
import { mockStore, user } from '@angular-slack/app/mocks';
import { Status } from '@libs/models';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let store: jasmine.SpyObj<Store<AuthState>>;

  beforeEach(() => {
    store = mockStore();
    component = new RegistrationComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      store.select.and.returnValue(of(true));
      component.ngOnInit();
    });

    it('should return true from loading$ observable', async() => {
      let loading = false;
      component.loading$.subscribe((value: boolean) => loading = value);

      expect(loading).toBeTrue();
    });

    it('should create a form with controls', () => {
      expect(Object.keys(component.form.controls)).toEqual(['userName', 'email', 'passwordGroup']);
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component['buildForm']();
    });

    it('should dispatch an action with correct type when form is valid', () => {
      const { displayName, email, password } = user;
      const value = { displayName, email, password, status: Status.OFFLINE };

      component.form.setValue({
        userName: displayName,
        email,
        passwordGroup: {
          password,
          confirmPassword: password,
        },
      });
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledOnceWith(register({ user: value }));
    });

    it('should not dispatch an action when form is invalid', () => {
      component.onSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
