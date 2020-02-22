import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AuthState, Login, authSubmitSelector, LoginGoogle } from 'src/app/+store/auth';

import { Observable } from 'rxjs';

import { GlobalErrorStateMatcher, errorMessages } from 'src/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loading$: Observable<boolean>;

  form: FormGroup;
  matcher = new GlobalErrorStateMatcher();
  errorMessages = errorMessages;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.loading$ = this.store.select(authSubmitSelector);
    this.buildForm();
  }

  onLoginWithGoole() {
    this.store.dispatch(new LoginGoogle());
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    this.store.dispatch(new Login(this.form.value));
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
