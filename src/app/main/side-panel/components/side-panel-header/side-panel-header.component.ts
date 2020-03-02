import { Component, ChangeDetectionStrategy } from '@angular/core';

import { fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-side-panel-header',
  templateUrl: './side-panel-header.component.html',
  styleUrls: ['./side-panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelHeaderComponent {
  icons = fontIcons;
}
