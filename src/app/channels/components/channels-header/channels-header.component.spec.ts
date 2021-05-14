import { ChannelsHeaderComponent } from './channels-header.component';

describe('ChannelsHeaderComponent', () => {
  let component: ChannelsHeaderComponent;

  beforeEach(() => {
    component = new ChannelsHeaderComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onAddChannel', () => {
    beforeEach(() => {
      spyOn(component.addChannel, 'emit');
      component.onAddChannel();
    });

    it('should emit "addChannel" event', () => {
      expect(component.addChannel.emit).toHaveBeenCalledTimes(1);
    });
  });
});
