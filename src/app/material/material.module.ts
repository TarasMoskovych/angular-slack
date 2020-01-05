import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ]
})
export class MaterialModule { }
