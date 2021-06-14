import { MatDialog } from '@angular/material/dialog';

import { mockDialog, user } from '@angular-slack/app/mocks';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { UserProfileViewComponent } from './user-profile-view.component';

describe('UserProfileViewComponent', () => {
  let component: UserProfileViewComponent;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    dialog = mockDialog();
    component = new UserProfileViewComponent(dialog);
    component.user = user;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onUpdateProfile', () => {
    it('should open the modal with user data', () => {
      component.onUpdateProfile();
      expect(dialog.open).toHaveBeenCalledOnceWith(UserProfileEditComponent, { data: user });
    });
  });

  describe('onToggleMenu', () => {
    it('should set menuOpened', () => {
      component.onToggleMenu(true);
      expect(component.menuOpened).toBeTrue();
    });
  });

  describe('onLogout', () => {
    beforeEach(() => {
      spyOn(component.logout, 'emit');
    });

    it('should emit logout event', () => {
      component.onLogout();
      expect(component.logout.emit).toHaveBeenCalledTimes(1);
    });
  });
});
