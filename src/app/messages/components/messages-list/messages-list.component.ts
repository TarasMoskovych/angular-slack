import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Message, TrackByUtil, User } from 'src/app/shared';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent extends TrackByUtil<Message> implements OnInit {
  @Input() messages: Message[] = [];
  @Input() user: User;

  ngOnInit(): void {
  }

}
