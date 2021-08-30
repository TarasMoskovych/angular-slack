import { fontIcons, Theme } from '@angular-slack/app/shared';
import { SharedModule } from '@angular-slack/app/shared/shared.module';
import { ChangeDetectionStrategy, Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorSketchModule } from 'ngx-color/sketch';

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

@NgModule({
  declarations: [ThemePickerComponent],
  imports: [
    SharedModule,
    ColorSketchModule,
  ],
})
class ThemePickerModule {}
