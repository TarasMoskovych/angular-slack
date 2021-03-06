import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { throwError } from 'rxjs';
import { AuthError } from '@angular-slack/app/shared';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar) { }

  handleError(err: AuthError) {
    this.show(err.message);
    return throwError(err);
  }

  show(message: string, action = 'Close') {
    this.matSnackBar.open(message, action, {
      duration: 2000
    });
  }
}
