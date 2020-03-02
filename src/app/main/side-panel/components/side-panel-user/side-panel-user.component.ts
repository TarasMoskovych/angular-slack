import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { User, generateAvatar } from 'src/app/shared';

@Component({
  selector: 'app-side-panel-user',
  templateUrl: './side-panel-user.component.html',
  styleUrls: ['./side-panel-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelUserComponent {
  @Input() user: User;
  @Output() changeAvatar = new EventEmitter<{ user: User, photoURL: string }>();
  @Output() logout = new EventEmitter<void>();

  menuOpened = false;

  onToggleMenu(menuOpened: boolean) {
    this.menuOpened = menuOpened;
  }

  onChangeAvatar() {
    // @TODO
    this.changeAvatar.emit({
      user: this.user,
      photoURL: generateAvatar([...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join(''))
    });
  }

  onLogout() {
    this.logout.emit();
  }

}
