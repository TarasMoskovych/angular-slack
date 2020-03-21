import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-channels-header',
  templateUrl: './channels-header.component.html',
  styleUrls: ['./channels-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsHeaderComponent {
  @Input() title: string;
  @Input() iconName: string;
  @Input() count: number = 0;
  @Input() add: boolean = false;
  @Output() addChannel = new EventEmitter<void>();

  icons = fontIcons;

  onAddChannel() {
    this.addChannel.emit();
  }

}
