import { fontIcons } from '@angular-slack/app/shared';
import { MessagesActionsComponent } from './messages-actions.component';

describe('MessagesActionsComponent', () => {
  let component: MessagesActionsComponent;

  beforeEach(() => {
    component = new MessagesActionsComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get icon', () => {
    it('should return faTimes when showEmoji is true', () => {
      component.showEmoji = true;
      expect(component.icon).toEqual(fontIcons.faTimes);
    });

    it('should return faPlus when showEmoji is false', () => {
      component.showEmoji = false;
      expect(component.icon).toEqual(fontIcons.faPlus);
    });
  });

  describe('onMessageAdd', () => {
    beforeEach(() => {
      spyOn(component.messageAdd, 'emit');
    });

    it('should emit event when message is not empty', () => {
      component.message = 'Test';
      component.onMessageAdd();

      expect(component.messageAdd.emit).toHaveBeenCalledOnceWith({ type: 'text', value: 'Test' });
    });

    it('should not emit event when message is empty', () => {
      component.message = '   ';
      component.onMessageAdd();

      expect(component.messageAdd.emit).not.toHaveBeenCalled();
    });
  });

  describe('onEmojiAdd', () => {
    beforeEach(() => {
      component.message = 'Test';
      component.input = { nativeElement: { focus: jasmine.createSpy() } } as any;
      spyOn(component, 'onToggleEmoji');

      component.onEmojiAdd({ emoji: { native: '*' } });
    });

    it('should add new symbol to the message', () => {
      expect(component.message).toBe('Test* ');
    });

    it('should focus input field', () => {
      expect(component.input.nativeElement.focus).toHaveBeenCalledTimes(1);
    });

    it('should call onToggleEmoji method', () => {
      expect(component.onToggleEmoji).toHaveBeenCalledTimes(1);
    });
  });

  describe('onToggleEmoji', () => {
    beforeEach(() => {
      component.showEmoji = true;
      spyOn(component.toggleEmoji, 'emit');

      component.onToggleEmoji();
    });

    it('should emit toggleEmoji event with reversed showEmoji value', () => {
      expect(component.toggleEmoji.emit).toHaveBeenCalledOnceWith(!component.showEmoji);
    });
  });
});
