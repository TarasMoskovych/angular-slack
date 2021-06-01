import { Store } from '@ngrx/store';

import { AppState, removeChannel, updateChannel } from 'src/app/+store';
import { channel, mockStore } from 'src/app/mocks';
import { Channel } from 'src/app/shared';
import { ChannelDetailComponent } from './channel-detail.component';

describe('ChannelDetailComponent', () => {
  let component: ChannelDetailComponent;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    store = mockStore();
    component = new ChannelDetailComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should call "select" 3 times', () => {
      expect(store.select).toHaveBeenCalledTimes(3);
    });
  });

  describe('onChannelEdit', () => {
    it('should dispatch action', () => {
      component.onChannelEdit({ name: 'New test channel' } as Channel, channel);
      expect(store.dispatch).toHaveBeenCalledOnceWith(updateChannel({ channel: { ...channel, name: 'New test channel' } }));
    });
  });

  describe('onChannelRemove', () => {
    it('should dispatch action', () => {
      component.onChannelRemove(channel);
      expect(store.dispatch).toHaveBeenCalledOnceWith(removeChannel({ channel }));
    });
  });
});
