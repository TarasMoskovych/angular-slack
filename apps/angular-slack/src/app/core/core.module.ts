import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: 'LocalStorage',
      useValue: window.localStorage,
    },
  ],
})
export class CoreModule { }
