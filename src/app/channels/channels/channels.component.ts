import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+store';

import { Observable } from 'rxjs';

import { ChannelsFormComponent } from '../components';
import { GetChannels, channelsSelector, SelectChannel, channelsSelectedSelector } from 'src/app/+store/channels';
import { Channel } from 'src/app/shared';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsComponent implements OnInit {
  channels$: Observable<Channel[]>;
  selected$: Observable<Channel>;

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getChannels();
  }

  onAddChannel() {
    this.dialog.open(ChannelsFormComponent);
  }

  onSelect(channel: Channel) {
    this.store.dispatch(new SelectChannel(channel));
  }

  private getChannels() {
    this.store.dispatch(new GetChannels());
    this.channels$ = this.store.select(channelsSelector);
    this.selected$ = this.store.select(channelsSelectedSelector);
  }
}
