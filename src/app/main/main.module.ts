import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import {
  SidePanelComponent,
  MessagesComponent,
  MetaPanelComponent,
  UserPanelComponent,
} from './components';

@NgModule({
  declarations: [
    MainComponent,
    SidePanelComponent,
    MessagesComponent,
    MetaPanelComponent,
    UserPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
