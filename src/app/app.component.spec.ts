import { Store } from '@ngrx/store';

import { AuthState, stateChange } from './+store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let mockStore: jasmine.SpyObj<Store<AuthState>>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store<AuthState>>('Store', ['dispatch']);
    component = new AppComponent(mockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should dispatch "stateChange"', () => {
      expect(mockStore.dispatch).toHaveBeenCalledOnceWith(stateChange());
    });
  });
});
