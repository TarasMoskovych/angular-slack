import { of } from 'rxjs';

import { channelsSelectedSelector, getThemes, themesSelectedSelector } from '../+store';
import { channel, mockStore, theme } from '../mocks';
import { Channel, Theme } from '../shared';
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
        .withArgs(channelsSelectedSelector).and.returnValue(of(channel))
        .withArgs(themesSelectedSelector).and.returnValue(of(theme));

      component.ngOnInit();
    });

    it('should return channel on channel$ subscribe', () => {
      component.channel$.subscribe((value: Channel) => {
        expect(value).toEqual(channel);
      });
    });

    it('should return theme on theme$ subscribe', () => {
      component.theme$.subscribe((value: Theme) => {
        expect(value).toEqual(theme);
      });
    });

    it('should dispatch "getThemes" action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(getThemes());
    });
  });
});
