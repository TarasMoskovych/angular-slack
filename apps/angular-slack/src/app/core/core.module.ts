import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: 'LocalStorage',
      useValue: window.localStorage,
    },
  ],
})
export class CoreModule { }
