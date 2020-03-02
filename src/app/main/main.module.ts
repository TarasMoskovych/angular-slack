import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import {
  MessagesComponent,
  MetaPanelComponent,
} from './components';

import { SidePanelModule } from './side-panel/side-panel.module';

@NgModule({
  declarations: [
    MainComponent,
    MessagesComponent,
    MetaPanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SidePanelModule,
    MainRoutingModule
  ]
})
export class MainModule { }
