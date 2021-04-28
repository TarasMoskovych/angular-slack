import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './messages.component';
import {
  MessagesHeaderComponent,
} from './components';

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MessagesComponent,
  ],
})
export class MessagesModule { }
