import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-messages-actions',
  templateUrl: './messages-actions.component.html',
  styleUrls: ['./messages-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesActionsComponent {
  @Input() showEmoji = false;
  @Output() messageAdd = new EventEmitter<{ type: 'text' | 'photo', value: string }>();
  @Output() toggleEmoji = new EventEmitter<boolean>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  icons = fontIcons;
  message = '';

  get icon() {
    return this.icons[this.showEmoji ? 'faTimes' : 'faPlus'];
  }

  onMessageAdd(): void {
    if (this.message.trim().length) {
      this.messageAdd.emit({ type: 'text', value: this.message });
      this.message = '';
    }
  }

  onEmojiAdd({ emoji }): void {
    this.message += `${emoji.native} `;
    this.input.nativeElement.focus();
    this.onToggleEmoji();
  }

  onToggleEmoji(): void {
    this.toggleEmoji.emit(!this.showEmoji);
  }
}
