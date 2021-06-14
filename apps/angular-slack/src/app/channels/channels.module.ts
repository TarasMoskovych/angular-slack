import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { channelsReducer, ChannelsEffects } from '../+store/channels';

import { SharedModule } from '../shared/shared.module';

import { ChannelsComponent } from './channels/channels.component';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';

import {
  ChannelsHeaderComponent,
  ChannelsFormComponent,
  ChannelsBodyComponent,
  ChannelsModalComponent
} from './components';

@NgModule({
  declarations: [
    ChannelsComponent,
    ChannelDetailComponent,
    ChannelsHeaderComponent,
    ChannelsBodyComponent,
    ChannelsFormComponent,
    ChannelsModalComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature('channels', channelsReducer),
    EffectsModule.forFeature([ChannelsEffects]),
  ],
  exports: [
    ChannelsComponent,
    ChannelDetailComponent,
  ]
})
export class ChannelsModule { }
