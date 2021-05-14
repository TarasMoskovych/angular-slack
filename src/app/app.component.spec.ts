import { Store } from '@ngrx/store';

import { AuthState, stateChange } from './+store';
import { AppComponent } from './app.component';
import { mockStore } from './mock';

describe('AppComponent', () => {
  let component: AppComponent;
  let store: jasmine.SpyObj<Store<AuthState>>;

  beforeEach(() => {
    store = mockStore();
    component = new AppComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should dispatch "stateChange"', () => {
      expect(store.dispatch).toHaveBeenCalledOnceWith(stateChange());
    });
  });
});
