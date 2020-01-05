import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomValidators, GlobalErrorStateMatcher, ParentErrorStateMatcher, errorMessages } from 'src/app/shared/helpers';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  matcher = new GlobalErrorStateMatcher();
  parentMatcher = new ParentErrorStateMatcher();
  errorMessages = errorMessages;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    const { userName, email } = this.form.value;
    const { password } = this.form.value.passwordGroup;

    this.form.disable();
    this.authService.register(userName, email, password)
      .finally(() => this.form.enable());
  }

  private buildForm() {
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwordGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
      }, { validators: CustomValidators.passwordMatcher })
    });
  }
}
