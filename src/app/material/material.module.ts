import { NgModule } from '@angular/core';

import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
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
    MatProgressSpinnerModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ]
})
export class MaterialModule { }
