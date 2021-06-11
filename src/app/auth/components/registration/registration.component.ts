import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthState, register, authSubmitSelector } from 'src/app/+store/auth';

import { Observable } from 'rxjs';

import { CustomValidators, GlobalErrorStateMatcher, ParentErrorStateMatcher, errorMessages, fontIcons, Status } from 'src/app/shared';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  loading$: Observable<boolean>;

  icons = fontIcons;
  form: FormGroup;
  matcher = new GlobalErrorStateMatcher();
  parentMatcher = new ParentErrorStateMatcher();
  errorMessages = errorMessages;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.loading$ = this.store.select(authSubmitSelector);
    this.buildForm();
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    const { userName, email } = this.form.value;
    const { password } = this.form.value.passwordGroup;

    this.store.dispatch(register({ user: { displayName: userName, email, password, status: Status.OFFLINE } }));
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
