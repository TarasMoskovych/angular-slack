import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Channel, fontIcons, TrackByUtil } from '@angular-slack/app/shared';
import { Status } from '@libs/models';

@Component({
  selector: 'app-channels-body',
  templateUrl: './channels-body.component.html',
  styleUrls: ['./channels-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsBodyComponent extends TrackByUtil<Channel> {
  @Input() starred: boolean;
  @Input() channels: Channel[];
  @Input() prefix = '#';
  @Input() selected: Channel;
  @Output() select = new EventEmitter<Channel>();

  icons = fontIcons;
  status = Status;

  onSelect(channel: Channel) {
    this.select.emit(channel);
  }

}
