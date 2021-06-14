import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import {
  AuthState,
  authSubmitSelector,
  authAuthorizeDataSelector,
  login,
  loginGoogle,
} from '@angular-slack/app/+store';

import { Observable, Subscription } from 'rxjs';

import { GlobalErrorStateMatcher, errorMessages, User, fontIcons } from '@angular-slack/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  sub$: Subscription;

  icons = fontIcons;
  form: FormGroup;
  matcher = new GlobalErrorStateMatcher();
  errorMessages = errorMessages;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.loading$ = this.store.select(authSubmitSelector);
    this.buildForm();
    this.onAuthorizeDataUpdate();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onAuthorizeDataUpdate() {
    this.sub$ = this.store.select(authAuthorizeDataSelector)
      .subscribe((user: User) => {
        if (!user) { return; }

        this.form.patchValue({ email: user.email, password: user.password });
      });
  }

  onLoginWithGoogle() {
    this.store.dispatch(loginGoogle());
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    this.store.dispatch(login({ user: this.form.value }));
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
