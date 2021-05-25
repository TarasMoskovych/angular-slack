import { Component, ChangeDetectionStrategy, Input, ViewChildren, QueryList } from '@angular/core';

import { Message, TrackByUtil, User } from 'src/app/shared';
import { MessagesListItemComponent } from '../messages-list-item/messages-list-item.component';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent extends TrackByUtil<Message> {
  @Input() messages: Message[] = [];
  @Input() user: User;
  @ViewChildren(MessagesListItemComponent) list: QueryList<MessagesListItemComponent>;

  ngOnChanges() {
    setTimeout(() => {
      if (this.list?.last) {
        this.list.last.scrollIntoView();
      }
    }, 0);
  }
}
