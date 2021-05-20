import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';

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

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

  }

  scrollIntoView(): void {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  get outcome(): boolean {
    return this.message.user.uid === this.user.uid;
  }
}
