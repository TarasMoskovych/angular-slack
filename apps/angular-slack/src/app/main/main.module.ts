import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ChannelsModule } from '../channels/channels.module';
import { MessagesModule } from '../messages/messages.module';
import { ThemeModule } from '../theme/theme.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

import { MainComponent } from './main.component';
import {
  MessagesPanelComponent,
  MetaPanelComponent,
  SidePanelComponent,
  ThemePanelComponent,
} from './components';

@NgModule({
  declarations: [
    MainComponent,
    MessagesPanelComponent,
    MetaPanelComponent,
    SidePanelComponent,
    ThemePanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileModule,
    ChannelsModule,
    MessagesModule,
    ThemeModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
