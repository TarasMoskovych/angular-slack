import { file } from '@angular-slack/app/mocks';
import { fontIcons } from '@angular-slack/app/shared';
import { MessagesActionsComponent } from './messages-actions.component';

describe('MessagesActionsComponent', () => {
  const reader = {
    readAsDataURL: () => reader.onload(),
    onload: cb => cb(),
    result: 'test',
  } as any;
  let component: MessagesActionsComponent;

  beforeEach(() => {
    component = new MessagesActionsComponent(reader);
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

      expect(component.messageAdd.emit).toHaveBeenCalledOnceWith({ media: false, value: 'Test' });
    });

    it('should not emit event when message is empty', () => {
      component.message = '   ';
      component.onMessageAdd();

      expect(component.messageAdd.emit).not.toHaveBeenCalled();
    });
  });

  describe('onFileDropped', () => {
    beforeEach(() => {
      spyOn(component.messageAdd, 'emit');
    });

    it('should emit "messageAdd" event when file is defined', () => {
      component.onFileDropped([file] as any);
      expect(component.messageAdd.emit).toHaveBeenCalledOnceWith({ media: true, value: String(reader.result).split(',')[1] });
    });
  });

  describe('onFileUpload', () => {
    beforeEach(() => {
      spyOn(component.messageAdd, 'emit');
    });

    it('should emit "messageAdd" event when file is defined', () => {
      component.onFileUpload({ target: { files: [file] }} as any);
      expect(component.messageAdd.emit).toHaveBeenCalledOnceWith({ media: true, value: String(reader.result).split(',')[1] });
    });

    it('should not emit "messageAdd" event when files are not defined', () => {
      component.onFileUpload({ target: {}} as any);
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
