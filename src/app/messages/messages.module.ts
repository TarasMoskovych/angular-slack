import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects, messagesReducer } from '../+store/messages';

import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './messages.component';
import {
  MessagesActionsComponent,
  MessagesHeaderComponent,
  MessagesListComponent,
  MessagesListItemComponent,
} from './components';

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesActionsComponent,
    MessagesHeaderComponent,
    MessagesListComponent,
    MessagesListItemComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('messages', messagesReducer),
    EffectsModule.forFeature([MessagesEffects]),
    PickerModule,
  ],
  exports: [
    MessagesComponent,
  ],
})
export class MessagesModule { }
