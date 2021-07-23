import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Theme } from '@angular-slack/app/shared';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeComponent {
  @Input() theme: Theme;
}
