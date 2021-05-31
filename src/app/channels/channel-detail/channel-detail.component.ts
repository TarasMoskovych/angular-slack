import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, removeChannel, topPostersSelector, updateChannel } from 'src/app/+store';
import { channelsSelectedSelector, authUserSelector } from 'src/app/+store';

import { Observable } from 'rxjs';

import { Channel, User, fontIcons, Poster } from 'src/app/shared';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelDetailComponent implements OnInit {
  channel$: Observable<Channel>;
  posters$: Observable<Poster[]>;
  user$: Observable<User>;

  icons = fontIcons;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getSelectedChannel();
    this.getTopPosters();
    this.getUser();
  }

  onChannelEdit(newChannel: Channel, channel: Channel): void {
    this.store.dispatch(updateChannel({ channel: { ...channel, ...newChannel } }));
  }

  onChannelRemove(channel: Channel): void {
    this.store.dispatch(removeChannel({ channel }));
  }

  private getSelectedChannel(): void {
    this.channel$ = this.store.select(channelsSelectedSelector);
  }

  private getTopPosters(): void {
    this.posters$ = this.store.select(topPostersSelector);
  }

  private getUser(): void {
    this.user$ = this.store.select(authUserSelector);
  }
}
