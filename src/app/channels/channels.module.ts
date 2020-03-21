import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { channelsReducer, ChannelsEffects } from '../+store/channels';

import { SharedModule } from '../shared/shared.module';

import { ChannelsComponent } from './channels/channels.component';
import {
  ChannelsHeaderComponent,
  ChannelsFormComponent,
  ChannelsBodyComponent
} from './components';

@NgModule({
  declarations: [
    ChannelsComponent,
    ChannelsHeaderComponent,
    ChannelsFormComponent,
    ChannelsBodyComponent
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('channels', channelsReducer),
    EffectsModule.forFeature([ChannelsEffects]),
  ],
  exports: [ChannelsComponent]
})
export class ChannelsModule { }
