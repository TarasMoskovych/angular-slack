import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class NotificationService {

  constructor(private matSnackBar: MatSnackBar) { }

  show(message: string, action = 'Close') {
    this.matSnackBar.open(message, action, {
      duration: 2000
    });
  }
}
