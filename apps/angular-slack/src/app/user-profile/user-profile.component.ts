import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthState, authUserSelector, logout } from '../+store';

import { Observable } from 'rxjs';

import { User } from '@libs/models';

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
    this.store.dispatch(logout());
  }

}
