import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { User } from '@angular-slack/app/shared';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileViewComponent {
  @Input() loading: boolean;
  @Input() user: User;
  @Output() logout = new EventEmitter<void>();

  menuOpened = false;

  constructor(private dialog: MatDialog) { }

  onUpdateProfile() {
    this.dialog.open(UserProfileEditComponent, {
      data: this.user
    });
  }

  onToggleMenu(menuOpened: boolean) {
    this.menuOpened = menuOpened;
  }

  onLogout() {
    this.logout.emit();
  }

}
