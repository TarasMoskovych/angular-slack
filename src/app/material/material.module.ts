import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }
