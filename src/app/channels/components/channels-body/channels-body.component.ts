import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Channel } from 'src/app/shared';

@Component({
  selector: 'app-channels-body',
  templateUrl: './channels-body.component.html',
  styleUrls: ['./channels-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsBodyComponent {
  @Input() channels: Channel[];
  @Input() prefix: string = '#';
  @Input() selected: Channel;
  @Output() select = new EventEmitter<Channel>();

  onSelect(channel: Channel) {
    this.select.emit(channel);
  }

}
