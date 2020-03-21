import { AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomValidators {
  static passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = c.get('password');
    const passwordConfirmControl = c.get('confirmPassword');
    return passwordControl.value === passwordConfirmControl.value ? null : { passwordMatch: true };
  }
}

export class GlobalErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.pristine && control.dirty || control.touched || isSubmitted));
  }
}

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.parent.invalid || control && control.invalid) && (control.pristine && control.dirty || control.touched || isSubmitted);
  }
}

export const errorMessages: { [key: string]: string } = {
  username: 'Please enter Username.',
  email: 'Please enter Email.',
  emailPattern: 'Email must be a valid email address (username@domain)',
  password: 'Please enter Password.',
  passwordLength: 'Password should be greater than 6 symbols.',
  confirmPassword: 'Please confirm Password.',
  confirmPasswordMatch: 'Confirm Password is not matched Password.',
  name: 'Please enter Name.',
  description: 'Please enter Description.',
};
