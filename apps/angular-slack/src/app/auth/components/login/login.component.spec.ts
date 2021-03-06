import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { mockStore, user } from '@angular-slack/app/mocks';
import { loginGoogle, login, AuthState } from '@angular-slack/app/+store';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let store: jasmine.SpyObj<Store<AuthState>>;

  beforeEach(() => {
    store = mockStore();
    component = new LoginComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      store.select.and.returnValue(of(true));
      spyOn(component, 'onAuthorizeDataUpdate');

      component.ngOnInit();
    });

    it('should return true from loading$ observable', async() => {
      let loading = false;
      component.loading$.subscribe((value: boolean) => loading = value);

      expect(loading).toBeTrue();
    });

    it('should create a form with controls', () => {
      expect(Object.keys(component.form.controls)).toEqual(['email', 'password']);
    });

    it('should call "onAuthorizeDataUpdate" method', () => {
      expect(component.onAuthorizeDataUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      component.sub$ = of(undefined).subscribe();
      spyOn(component.sub$, 'unsubscribe').and.callThrough();

      component.ngOnDestroy();
    });

    it('should unsubscribe from sub$', () => {
      expect(component.sub$.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('onAuthorizeDataUpdate', () => {
    beforeEach(() => {
      component.form = new FormGroup({});

      spyOn(component.form, 'patchValue');
    });

    it('should call "patchValue" method when user is defined', () => {
      store.select.and.returnValue(of(user));
      component.onAuthorizeDataUpdate();

      expect(component.form.patchValue).toHaveBeenCalledOnceWith({ email: user.email, password: user.password });
    });

    it('should not call "patchValue" method when user is undefined', () => {
      store.select.and.returnValue(of(undefined));
      component.onAuthorizeDataUpdate();

      expect(component.form.patchValue).not.toHaveBeenCalled();
    });
  });

  describe('onLoginWithGoogle', () => {
    it('should dispatch an action with correct type', () => {
      component.onLoginWithGoogle();

      expect(store.dispatch).toHaveBeenCalledOnceWith(loginGoogle());
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component['buildForm']();
    });

    it('should dispatch an action with correct type when form is valid', () => {
      const value = {
        email: 'abc@gmail.com',
        password: '123456',
      };
      component.form.setValue(value);
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledOnceWith(login({ user: value }));
    });

    it('should not dispatch an action when form is invalid', () => {
      component.onSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
