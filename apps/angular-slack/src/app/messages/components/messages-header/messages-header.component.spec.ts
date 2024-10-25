import { channel } from '@angular-slack/app/mocks';
import { Status } from '@libs/models';
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

  describe('get searchIcon', () => {
    it('should return close when searhTerm has value', () => {
      component.searchTerm = 'Test';
      expect(component.searchIcon).toBe('close');
    });

    it('should return search when searhTerm is empty', () => {
      component.searchTerm = '';
      expect(component.searchIcon).toBe('search');
    });
  });

  describe('get prefix', () => {
    it('should return "@" when channel is private', () => {
      component.channel = { ...channel, private: true };
      expect(component.prefix).toBe('@');
    });

    it('should return "#" when channel is public', () => {
      component.channel = { ...channel, private: false };
      expect(component.prefix).toBe('#');
    });
  });

  describe('get isOnline', () => {
    it('should return true when channel status is ONLINE', () => {
      component.channel = { ...channel, status: Status.ONLINE };
      expect(component.isOnline).toBeTrue();
    });
  });

  describe('numberOfUsers', () => {
    it('should return "1 User"', () => {
      component.users = 1;
      expect(component.numberOfUsers).toBe('1 User');
    });

    it('should return "10 Users"', () => {
      component.users = 10;
      expect(component.numberOfUsers).toBe('10 Users');
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

  describe('onClear', () => {
    beforeEach(() => {
      component.searchTerm = 'Test';
      spyOn(component, 'onSearch');

      component.onClear();
    });

    it('should reset search', () => {
      expect(component.searchTerm).toBe('');
    });

    it('should call onSearch', () => {
      expect(component.onSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSearch', () => {
    beforeEach(() => {
      spyOn(component.search, 'emit');
    });

    it('should emit search event with data', () => {
      component.searchTerm = 'Test';
      component.onSearch();

      expect(component.search.emit).toHaveBeenCalledOnceWith('Test');
    });
  });

  describe('onCall', () => {
    beforeEach(() => {
      spyOn(component.call, 'emit');
    });

    it('should emit call event with data', () => {
      component.channel = channel;
      component.onCall();

      expect(component.call.emit).toHaveBeenCalledOnceWith(channel);
    });
  });
});
