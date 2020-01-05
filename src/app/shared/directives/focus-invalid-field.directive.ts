import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusInvalidField]'
})
export class FocusInvalidFieldDirective {
  constructor(private el: ElementRef) { }

  @HostListener('submit')
  onFormSubmit() {
    const invalidControl = this.el.nativeElement.querySelector('.mat-form-field-infix .ng-invalid');

    if (invalidControl) {
      invalidControl.focus();
    }
  }
}
