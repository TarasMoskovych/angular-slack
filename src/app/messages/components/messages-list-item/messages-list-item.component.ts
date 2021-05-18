import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Message, User } from 'src/app/shared';

@Component({
  selector: 'app-messages-list-item',
  templateUrl: './messages-list-item.component.html',
  styleUrls: ['./messages-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListItemComponent implements OnInit {
  @Input() message: Message;
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

  get outcome(): boolean {
    return this.message.user.uid === this.user.uid;
  }
}
