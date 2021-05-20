import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChildren, QueryList } from '@angular/core';

import { Message, TrackByUtil, User } from 'src/app/shared';
import { MessagesListItemComponent } from '../messages-list-item/messages-list-item.component';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent extends TrackByUtil<Message> implements OnInit {
  @Input() messages: Message[] = [];
  @Input() user: User;
  @ViewChildren(MessagesListItemComponent) list: QueryList<MessagesListItemComponent>;

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.list?.last) {
      setTimeout(() => this.list.last.scrollIntoView(), 0);
    }
  }
}
