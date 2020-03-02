import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState, authUserSelector, Logout, UpdateProfilePhoto } from 'src/app/+store';

import { Observable } from 'rxjs';

import { User } from 'src/app/shared';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(authUserSelector);
  }

  onChangeAvatar(data: { user: User, photoURL: string }) {
    this.store.dispatch(new UpdateProfilePhoto(data));
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

}
