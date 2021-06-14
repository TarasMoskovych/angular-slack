import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { addChannel, addChannelInit, AppState } from '@angular-slack/app/+store';
import { channel, mockDialogRef, mockStore } from '@angular-slack/app/mocks';
import { ChannelsModalComponent } from './channels-modal.component';

describe('ChannelsModalComponent', () => {
  let component: ChannelsModalComponent;
  let store: jasmine.SpyObj<Store<AppState>>;
  let dialog: jasmine.SpyObj<MatDialogRef<ChannelsModalComponent>>;

  beforeEach(() => {
    store = mockStore();
    store.select.and.returnValue(of(true));
    dialog = mockDialogRef();
    component = new ChannelsModalComponent(store, dialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'onClose');
      component.ngOnInit();
    });

    it('should dispatch "addChannelInit" action', () => {
      expect(store.dispatch).toHaveBeenCalledOnceWith(addChannelInit());
    });

    it('should call select twice', () => {
      expect(store.select).toHaveBeenCalledTimes(2);
    });

    it('should call "onClose" method', () => {
      expect(component.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      component.ngOnInit();
      spyOn(component['sub$'], 'unsubscribe');
      component.ngOnDestroy();
    });

    it('should call unsubscribe method', () => {
      expect(component['sub$'].unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('onChannelAdd', () => {
    beforeEach(() => {
      component.onChannelAdd(channel);
    });

    it('should dispatch "addChannel" action', () => {
      expect(store.dispatch).toHaveBeenCalledOnceWith(addChannel({ channel }));
    });
  });

  describe('onClose', () => {
    beforeEach(() => {
      component.onClose();
    });

    it('should call "close" method', () => {
      expect(dialog.close).toHaveBeenCalledTimes(1);
    });
  });
});
