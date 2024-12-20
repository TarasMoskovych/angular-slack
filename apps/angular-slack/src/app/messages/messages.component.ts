import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  addMessage,
  authUserSelector,
  channelsSelectedSelector,
  filteredMessagesSelector,
  getMessages,
  getPrivateMessages,
  numberOfUsersSelector,
  searchMessages,
  searchSelector,
  selectedStarredSelector,
  starChannel,
  starredChannelsLengthSelector,
} from '@angular-slack/app/+store';
import { Channel, Message, serverTimestamp } from '@angular-slack/app/shared';
import { User } from '@libs/models';
import { StorageService, VideoCallService } from '../core';

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
  searchTerm$: Observable<string>;
  starredChannelsLength$: Observable<number>;
  showEmoji = false;
  progress$: Observable<number>;
  user$: Observable<User>;
  users$: Observable<number>;

  constructor(
    private store: Store,
    private storageService: StorageService,
    private videoCallService: VideoCallService,
  ) { }

  ngOnInit(): void {
    this.channel$ = this.store.select(channelsSelectedSelector).pipe(
      tap((channel: Channel) => {
        if (!channel) return;

        const action = channel.private ? getPrivateMessages : getMessages;
        this.store.dispatch(action({ channelId: channel.id }));
      }),
    );
    this.isStarred$ = this.store.select(selectedStarredSelector);
    this.messages$ = this.store.select(filteredMessagesSelector);
    this.searchTerm$ = this.store.select(searchSelector);
    this.starredChannelsLength$ = this.store.select(starredChannelsLengthSelector);
    this.progress$ = this.storageService.progress$;
    this.user$ = this.store.select(authUserSelector);
    this.users$ = this.store.select(numberOfUsersSelector);
  }

  onStar({ channel, starred }: { channel: Channel, starred: boolean }): void {
    this.store.dispatch(starChannel({ channel: { [channel.id]: starred } }));
  }

  onMessageAdd(data: { media: boolean, value: string }, channel: Channel, user: User) {
    const message: Message = {
      id: Date.now(),
      uid: user.uid,
      channelId: channel.private ? `${user.uid}-${channel.id}` : channel.id,
      content: data.value,
      timestamp: serverTimestamp(),
      media: data.media,
      user,
    };
    this.store.dispatch(addMessage({ message }));
  }

  onToggleEmoji(showEmoji: boolean): void {
    this.showEmoji = showEmoji;
  }

  onSearch(search: string): void {
    this.store.dispatch(searchMessages({ search }));
  }

  onCall(channel: Channel): void {
    this.videoCallService.call(channel);
  }
}
