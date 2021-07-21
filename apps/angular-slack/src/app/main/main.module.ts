import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ChannelsModule } from '../channels/channels.module';
import { MessagesModule } from '../messages/messages.module';
import { ThemesModule } from '../themes/themes.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

import { MainComponent } from './main.component';
import {
  MessagesPanelComponent,
  MetaPanelComponent,
  SidePanelComponent,
  ThemesPanelComponent,
} from './components';

@NgModule({
  declarations: [
    MainComponent,
    MessagesPanelComponent,
    MetaPanelComponent,
    SidePanelComponent,
    ThemesPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileModule,
    ChannelsModule,
    MessagesModule,
    ThemesModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
