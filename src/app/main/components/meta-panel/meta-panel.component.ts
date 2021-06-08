import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-meta-panel',
  templateUrl: './meta-panel.component.html',
  styleUrls: ['./meta-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaPanelComponent {}
