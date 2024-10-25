import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';

import { Message } from '@angular-slack/app/shared';
import { User } from '@libs/models';

@Component({
  selector: 'app-messages-list-item',
  templateUrl: './messages-list-item.component.html',
  styleUrls: ['./messages-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListItemComponent {
  @Input() message: Message;
  @Input() user: User;

  constructor(private elementRef: ElementRef) { }

  scrollIntoView(): void {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  get outcome(): boolean {
    return this.message.user.uid === this.user.uid;
  }
}
