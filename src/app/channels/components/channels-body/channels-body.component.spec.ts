import { channel } from 'src/app/mocks';
import { ChannelsBodyComponent } from './channels-body.component';

describe('ChannelsBodyComponent', () => {
  let component: ChannelsBodyComponent;

  beforeEach(() => {
    component = new ChannelsBodyComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSelect', () => {
    beforeEach(() => {
      spyOn(component.select, 'emit');
      component.onSelect(channel);
    });

    it('should emit "select" event', () => {
      expect(component.select.emit).toHaveBeenCalledOnceWith(channel);
    });
  });
});
