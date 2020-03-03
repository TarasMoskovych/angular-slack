import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/shared';
import { SidePanelUserUpdateComponent } from '../side-panel-user-update/side-panel-user-update.component';

@Component({
  selector: 'app-side-panel-user',
  templateUrl: './side-panel-user.component.html',
  styleUrls: ['./side-panel-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelUserComponent {
  @Input() user: User;
  @Output() logout = new EventEmitter<void>();

  menuOpened = false;

  constructor(private dialog: MatDialog) { }

  onToggleMenu(menuOpened: boolean) {
    this.menuOpened = menuOpened;
  }

  onUpdateProfile() {
    this.dialog.open(SidePanelUserUpdateComponent, {
      data: this.user
    });
  }

  onLogout() {
    this.logout.emit();
  }

}
