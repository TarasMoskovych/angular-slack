import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ChannelsModule } from '../channels/channels.module';
import { MessagesModule } from '../messages/messages.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

import { MainComponent } from './main.component';
import {
  MessagesPanelComponent,
  MetaPanelComponent,
  SidePanelComponent,
} from './components';

@NgModule({
  declarations: [
    MainComponent,
    MessagesPanelComponent,
    MetaPanelComponent,
    SidePanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileModule,
    ChannelsModule,
    MessagesModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
