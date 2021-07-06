import { file } from '@angular-slack/app/mocks';
import { DropFileDirective } from './drop-file.directive';

describe('DropFileDirective', () => {
  let event: any;
  const directive = new DropFileDirective();

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  beforeEach(() => {
    event = {
      preventDefault: jasmine.createSpy(),
      stopPropagation: jasmine.createSpy(),
    };
  });

  describe('onDragOver', () => {
    beforeEach(() => {
      directive.onDragOver(event as any);
    });

    it('should call "preventDefault"', () => {
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call "stopPropagation"', () => {
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should set "fileOver" to true', () => {
      expect(directive.fileOver).toBeTrue();
    });
  });

  describe('onDragLeave', () => {
    beforeEach(() => {
      directive.onDragLeave(event as any);
    });

    it('should call "preventDefault"', () => {
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call "stopPropagation"', () => {
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should set "fileOver" to false', () => {
      expect(directive.fileOver).toBeFalse();
    });
  });

  describe('onDrop', () => {
    beforeEach(() => {
      spyOn(directive.fileDropped, 'emit');
    });

    it('should emit "fileDropped" event when file is defined', () => {
      directive.onDrop({...event, dataTransfer: { files: [file] } });
      expect(directive.fileDropped.emit).toHaveBeenCalledWith([file] as any);
    });

    it('should not emit "fileDropped" event when file is not defined', () => {
      directive.onDrop({...event, dataTransfer: { files: [] } });
      expect(directive.fileDropped.emit).not.toHaveBeenCalled();
    });
  });
});
