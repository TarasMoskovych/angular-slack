import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';

import {
  FocusInvalidFieldDirective,
} from './directives';

import {
  ButtonWithIconComponent,
} from './components';

@NgModule({
  declarations: [
    FocusInvalidFieldDirective,
    ButtonWithIconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialModule,
    FocusInvalidFieldDirective,
    ButtonWithIconComponent,
  ],
})
export class SharedModule { }
