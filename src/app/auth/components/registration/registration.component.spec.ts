import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AuthState, register } from 'src/app/+store';
import { user } from 'src/app/mock';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let mockStore: jasmine.SpyObj<Store<AuthState>>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store<AuthState>>('Store', ['select', 'dispatch']);
    component = new RegistrationComponent(mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      mockStore.select.and.returnValue(of(true));
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
      const value = { displayName, email, password };

      component.form.setValue({
        userName: displayName,
        email,
        passwordGroup: {
          password,
          confirmPassword: password,
        },
      });
      component.onSubmit();

      expect(mockStore.dispatch).toHaveBeenCalledOnceWith(register({ user: value }));
    });

    it('should not dispatch an action when form is invalid', () => {
      component.onSubmit();
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });
  });
});
