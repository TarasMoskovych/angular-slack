import { ElementRef } from '@angular/core';

import { mockElementRef } from '@angular-slack/app/mocks';
import { FocusInvalidFieldDirective } from './focus-invalid-field.directive';

describe('FocusInvalidFieldDirective', () => {
  let directive: FocusInvalidFieldDirective;
  let elementRef: jasmine.SpyObj<ElementRef>;

  beforeEach(() => {
    elementRef = mockElementRef();
    directive = new FocusInvalidFieldDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('onFormSubmit', () => {
    it('should call focus on invalid field', () => {
      elementRef.nativeElement.querySelector.and.returnValue(elementRef.nativeElement);
      directive.onFormSubmit();

      expect(elementRef.nativeElement.focus).toHaveBeenCalledTimes(1);
    });

    it('should not call focus', () => {
      elementRef.nativeElement.querySelector.and.returnValue(undefined);
      directive.onFormSubmit();

      expect(elementRef.nativeElement.focus).not.toHaveBeenCalled();
    });
  });
});
