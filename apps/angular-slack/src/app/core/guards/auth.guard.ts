import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, authUserSelector } from '@angular-slack/app/+store';

import { map, take } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User } from '@angular-slack/app/shared';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  canActivate(): Observable<boolean> {
    return this.store.select(authUserSelector).pipe(
      map((user: User) => {
        if (user) {
          return true;
        }

        this.router.navigate(['login']);
        return false;
      }),
      take(1)
    );
  }
}
