import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-messages-actions',
  templateUrl: './messages-actions.component.html',
  styleUrls: ['./messages-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesActionsComponent implements OnInit {
  @Output() messageAdd = new EventEmitter<{ type: 'text' | 'photo', value: string }>();

  icons = fontIcons;
  message = '';

  constructor() { }

  ngOnInit(): void {
  }

  onMessageAdd(): void {
    if (this.message.trim().length) {
      this.messageAdd.emit({ type: 'text', value: this.message });
      this.message = '';
    }
  }

}
