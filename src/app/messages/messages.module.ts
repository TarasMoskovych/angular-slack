import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './messages.component';
import {
  MessagesActionsComponent,
  MessagesHeaderComponent,
} from './components';

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesActionsComponent,
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
