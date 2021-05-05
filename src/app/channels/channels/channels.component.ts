import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+store';

import { Observable } from 'rxjs';

import { ChannelsModalComponent } from '../components';
import { Channel } from 'src/app/shared';
import {
  GetChannels,
  GetStarredChannels,
  SelectChannel,
  channelsSelector,
  channelsSelectedSelector,
  starredChannelsSelector,
} from 'src/app/+store/channels';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsComponent implements OnInit {
  channels$: Observable<Channel[]>;
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
    this.store.dispatch(new SelectChannel({ ...channel, starred }));
  }

  private getChannels() {
    this.store.dispatch(new GetChannels());
    this.store.dispatch(new GetStarredChannels());
    this.channels$ = this.store.select(channelsSelector);
    this.starredChannels$ = this.store.select(starredChannelsSelector);
    this.selected$ = this.store.select(channelsSelectedSelector);
  }
}
