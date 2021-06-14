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
  @Output() star = new EventEmitter<{ channel: Channel, starred: boolean }>();
  @Output() search = new EventEmitter<string>();

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
}
