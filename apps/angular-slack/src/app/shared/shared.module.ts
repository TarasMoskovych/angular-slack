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

import {
  DateAgoPipe,
} from './pipes';

@NgModule({
  declarations: [
    FocusInvalidFieldDirective,
    ButtonWithIconComponent,
    DateAgoPipe,
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
    DateAgoPipe,
  ],
})
export class SharedModule { }
