import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppState, authUserSelector } from '@angular-slack/app/+store';
import { Store } from '@ngrx/store';

import { map, take } from 'rxjs/operators';

import { User } from '@libs/models';
import { CoreModule } from '../core.module';

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
