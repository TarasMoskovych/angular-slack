import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Channel, fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-messages-header',
  templateUrl: './messages-header.component.html',
  styleUrls: ['./messages-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesHeaderComponent {
  @Input() starredChannelsLength: number;
  @Input() channel: Channel;
  @Input() starred: boolean;
  @Output() star = new EventEmitter<{ channel: Channel, starred: boolean }>();

  icons = fontIcons;

  get showIcon(): boolean {
    return this.starredChannelsLength < 5 || this.starred;
  }

  onStar(): void {
    this.star.emit({ channel: this.channel, starred: !this.starred });
  }
}
