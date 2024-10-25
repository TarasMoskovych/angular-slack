import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  AuthState,
  authAuthorizeDataSelector,
  authSubmitSelector,
  login,
  loginGoogle,
} from '@angular-slack/app/+store';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { GlobalErrorStateMatcher, errorMessages, fontIcons } from '@angular-slack/app/shared';
import { User } from '@libs/models';

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
