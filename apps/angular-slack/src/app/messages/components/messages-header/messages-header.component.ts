import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Channel, fontIcons } from '@angular-slack/app/shared';

@Component({
  selector: 'app-messages-header',
  templateUrl: './messages-header.component.html',
  styleUrls: ['./messages-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesHeaderComponent {
  @Input() starredChannelsLength: number;
  @Input() channel: Channel;
  @Input() searchTerm = '';
  @Input() starred: boolean;
  @Input() users = 0;
  @Output() star = new EventEmitter<{ channel: Channel, starred: boolean }>();
  @Output() search = new EventEmitter<string>();
  @Output() call = new EventEmitter<Channel>();

  icons = fontIcons;

  get showIcon(): boolean {
    return this.starredChannelsLength < 5 || this.starred;
  }

  get searchIcon(): string {
    return this.searchTerm.length ? 'close' : 'search';
  }

  get prefix(): string {
    return this.channel.private ? '@' : '#';
  }

  get numberOfUsers(): string {
    return this.users === 1 ? `${this.users} User` : `${this.users} Users`;
  }

  get isOnline(): boolean {
    return this.channel.status === 'ONLINE';
  }

  onStar(): void {
    this.star.emit({ channel: this.channel, starred: !this.starred });
  }

  onClear(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onCall(): void {
    this.call.emit(this.channel);
  }
}
