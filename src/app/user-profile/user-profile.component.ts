import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthState, authUserSelector, Logout, userProfileLoadingSelector } from '../+store';

import { Observable } from 'rxjs';

import { User } from '../shared';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(authUserSelector);
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

}
