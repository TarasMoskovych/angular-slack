import { channel } from 'src/app/mocks';
import { MessagesHeaderComponent } from './messages-header.component';

describe('MessagesHeaderComponent', () => {
  let component: MessagesHeaderComponent;

  beforeEach(() => {
    component = new MessagesHeaderComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get showIcon', () => {
    beforeEach(() => {
      component.starred = true;
    });

    it('should show icon when starredChannelsLength is less than 5', () => {
      component.starredChannelsLength = 4;
      expect(component.showIcon).toBeTrue();
    });

    it('should show icon when starredChannelsLength is greater than 5 and starred is true', () => {
      component.starredChannelsLength = 10;
      expect(component.showIcon).toBeTrue();
    });
  });

  describe('onStar', () => {
    beforeEach(() => {
      spyOn(component.star, 'emit');

      component.channel = channel;
      component.starred = true;
    });

    it('should emit event with correct data', () => {
      component.onStar();
      expect(component.star.emit).toHaveBeenCalledOnceWith({ channel: component.channel, starred: !component.starred });
    });
  });
});
