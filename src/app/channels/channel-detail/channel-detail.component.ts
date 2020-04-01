import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, RemoveChannel, UpdateChannel } from 'src/app/+store';
import { channelsSelectedSelector, authUserSelector } from 'src/app/+store';

import { Observable } from 'rxjs';

import { Channel, User, fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelDetailComponent implements OnInit {
  channel$: Observable<Channel>;
  user$: Observable<User>;

  icons = fontIcons;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getSelectedChannel();
    this.getUser();
  }

  onChannelEdit(newChannel: Channel, channel: Channel) {
    this.store.dispatch(new UpdateChannel({ ...channel, ...newChannel }));
  }

  onChannelRemove(channel: Channel) {
    this.store.dispatch(new RemoveChannel(channel));
  }

  private getSelectedChannel() {
    this.channel$ = this.store.select(channelsSelectedSelector);
  }

  private getUser() {
    this.user$ = this.store.select(authUserSelector);
  }

}
