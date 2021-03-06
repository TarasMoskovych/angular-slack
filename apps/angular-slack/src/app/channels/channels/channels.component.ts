import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from '@angular-slack/app/+store';

import { Observable } from 'rxjs';

import { ChannelsModalComponent } from '../components';
import { Channel } from '@angular-slack/app/shared';
import {
  getChannels,
  getStarredChannels,
  getPrivateChannels,
  selectChannel,
  channelsSelector,
  channelsSelectedSelector,
  starredChannelsSelector,
  privateChannelsSelector,
} from '@angular-slack/app/+store/channels';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsComponent implements OnInit {
  channels$: Observable<Channel[]>;
  privateChannels$: Observable<Channel[]>;
  starredChannels$: Observable<Channel[]>;
  selected$: Observable<Channel>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getChannels();
  }

  onAddChannel() {
    this.dialog.open(ChannelsModalComponent);
  }

  onSelect(channel: Channel, starred: boolean) {
    this.store.dispatch(selectChannel({ channel: { ...channel, starred } }));
  }

  private getChannels() {
    this.store.dispatch(getChannels());
    this.store.dispatch(getPrivateChannels());
    this.store.dispatch(getStarredChannels());
    this.channels$ = this.store.select(channelsSelector);
    this.privateChannels$ = this.store.select(privateChannelsSelector);
    this.starredChannels$ = this.store.select(starredChannelsSelector);
    this.selected$ = this.store.select(channelsSelectedSelector);
  }
}
