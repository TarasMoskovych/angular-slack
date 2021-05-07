import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Channel } from 'src/app/shared';
import {
  channelsSelectedSelector,
  selectedStarredSelector,
  starChannel,
  starredChannelsLengthSelector,
} from 'src/app/+store';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
  channel$: Observable<Channel>;
  isStarred$: Observable<boolean>;
  starredChannelsLength$: Observable<number>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.channel$ = this.store.select(channelsSelectedSelector);
    this.isStarred$ = this.store.select(selectedStarredSelector);
    this.starredChannelsLength$ = this.store.select(starredChannelsLengthSelector);
  }

  onStar({ channel, starred }: { channel: Channel, starred: boolean }): void {
    this.store.dispatch(starChannel({ channel: { [channel.id]: starred } }));
  }
}
