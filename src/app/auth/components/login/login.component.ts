import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GlobalErrorStateMatcher, errorMessages } from 'src/app/shared';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  matcher = new GlobalErrorStateMatcher();
  errorMessages = errorMessages;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    const { email, password } = this.form.value;

    this.form.disable();
    this.authService.login(email, password)
      .finally(() => this.form.enable());
  }

  private buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
