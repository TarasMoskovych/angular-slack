import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ChannelsModule } from '../channels/channels.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

import { MainComponent } from './main.component';
import {
  MessagesComponent,
  MetaPanelComponent,
  SidePanelComponent,
} from './components';

@NgModule({
  declarations: [
    MainComponent,
    MessagesComponent,
    MetaPanelComponent,
    SidePanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileModule,
    ChannelsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
