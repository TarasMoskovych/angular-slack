import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Channel, Message, User, serverTimestamp } from 'src/app/shared';
import {
  addMessage,
  authUserSelector,
  channelsSelectedSelector,
  getMessages,
  messagesSelector,
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
  messages$: Observable<Message[]>;
  starredChannelsLength$: Observable<number>;
  user$: Observable<User>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.channel$ = this.store.select(channelsSelectedSelector).pipe(
      tap((channel: Channel) => {
        channel?.id && this.store.dispatch(getMessages({ channelId: channel.id }));
      }),
    );
    this.isStarred$ = this.store.select(selectedStarredSelector);
    this.messages$ = this.store.select(messagesSelector);
    this.starredChannelsLength$ = this.store.select(starredChannelsLengthSelector);
    this.user$ = this.store.select(authUserSelector);
  }

  onStar({ channel, starred }: { channel: Channel, starred: boolean }): void {
    this.store.dispatch(starChannel({ channel: { [channel.id]: starred } }));
  }

  onMessageAdd(data: { type: 'text' | 'photo', value: string }, channelId: string, user: User) {
    const message: Message = {
      id: Date.now(),
      channelId,
      content: data.value,
      timestamp: serverTimestamp(),
      user,
    };
    this.store.dispatch(addMessage({ message }));
  }
}
