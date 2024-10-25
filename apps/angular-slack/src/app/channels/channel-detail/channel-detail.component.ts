import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AppState, authUserSelector, channelsSelectedSelector, removeChannel, topPostersSelector, updateChannel } from '@angular-slack/app/+store';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Channel, fontIcons, Poster } from '@angular-slack/app/shared';
import { User } from '@libs/models';

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
