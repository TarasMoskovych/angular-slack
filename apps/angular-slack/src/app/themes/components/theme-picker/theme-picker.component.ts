import { fontIcons, Theme } from '@angular-slack/app/shared';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent {
  icons = fontIcons;

  constructor(@Inject(MAT_DIALOG_DATA) public theme: Theme) { }
}
