import { ChangeDetectionStrategy, Component, Input, OnChanges, QueryList, ViewChildren } from '@angular/core';

import { Message, TrackByUtil } from '@angular-slack/app/shared';
import { User } from '@libs/models';
import { MessagesListItemComponent } from '../messages-list-item/messages-list-item.component';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent extends TrackByUtil<Message> implements OnChanges {
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
