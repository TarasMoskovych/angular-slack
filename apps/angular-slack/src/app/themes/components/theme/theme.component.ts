import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Theme } from '@angular-slack/app/shared';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  @Input() theme: Theme;
  @Input() selected: boolean;
  @Output() remove = new EventEmitter<Theme>();

  onRemove(): void {
    this.remove.emit(this.theme);
  }
}
