import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { fontIcons } from '@angular-slack/app/shared';

@Component({
  selector: 'app-messages-actions',
  templateUrl: './messages-actions.component.html',
  styleUrls: ['./messages-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FileReader],
})
export class MessagesActionsComponent {
  @Input() showEmoji = false;
  @Input() progress: number;
  @Output() messageAdd = new EventEmitter<{ media: boolean, value: string }>();
  @Output() toggleEmoji = new EventEmitter<boolean>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  icons = fontIcons;
  message = '';

  constructor(private reader: FileReader) { }

  get icon() {
    return this.icons[this.showEmoji ? 'faTimes' : 'faPlus'];
  }

  onMessageAdd(): void {
    if (this.message.trim().length) {
      this.messageAdd.emit({ media: false, value: this.message });
      this.message = '';
    }
  }

  onFileDropped(files: FileList) {
    this.addMedia(files[0]);
  }

  onFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files?.length) {
      this.addMedia(target.files[0]);
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

  private addMedia(file: File): void {
    this.reader.onload = () => this.messageAdd.emit({ media: true, value: String(this.reader.result).split(',')[1] });
    this.reader.readAsDataURL(file);
  }
}
