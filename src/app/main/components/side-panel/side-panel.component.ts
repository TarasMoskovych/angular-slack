import { Component, ChangeDetectionStrategy } from '@angular/core';

import { fontIcons } from 'src/app/shared';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelComponent {
  icons = fontIcons;
}
