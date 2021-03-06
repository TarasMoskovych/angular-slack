import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AppState, selectChannel } from '@angular-slack/app/+store';
import { channel, mockDialog, mockStore } from '@angular-slack/app/mocks';
import { ChannelsModalComponent } from '../components';
import { ChannelsComponent } from './channels.component';

describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let store: jasmine.SpyObj<Store<AppState>>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    store = mockStore();
    dialog = mockDialog();
    component = new ChannelsComponent(dialog, store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should call "dispatch" three times', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(3);
    });

    it('should call "select" four times', () => {
      expect(store.select).toHaveBeenCalledTimes(4);
    });
  });

  describe('onAddChannel', () => {
    beforeEach(() => {
      component.onAddChannel();
    });

    it('should open dialog', () => {
      expect(dialog.open).toHaveBeenCalledOnceWith(ChannelsModalComponent);
    });
  });

  describe('onSelect', () => {
    beforeEach(() => {
      component.onSelect(channel, true);
    });

    it('should dispatch selectChannel action', () => {
      expect(store.dispatch).toHaveBeenCalledOnceWith(selectChannel({ channel: { ...channel, starred: true } }));
    });
  });
});
