import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    AngularFontAwesomeModule,
    MaterialModule
  ]
})
export class SharedModule { }
