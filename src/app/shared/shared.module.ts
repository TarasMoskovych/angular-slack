import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MaterialModule } from '../material/material.module';

import { FocusInvalidFieldDirective } from './directives';

@NgModule({
  declarations: [
    FocusInvalidFieldDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    MaterialModule,
    FocusInvalidFieldDirective
  ]
})
export class SharedModule { }
