import { of } from 'rxjs';

import { channelsSelectedSelector } from '../+store';
import { channel, mockStore } from '../mocks';
import { Channel } from '../shared';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let store: jasmine.SpyObj<any>;

  beforeEach(() => {
    store = mockStore();
    component = new MainComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      store.select
        .withArgs(channelsSelectedSelector).and.returnValue(of(channel));

      component.ngOnInit();
    });

    it('should return channel on channel$ subscribe', () => {
      component.channel$.subscribe((value: Channel) => {
        expect(value).toEqual(channel);
      });
    });
  });
});
