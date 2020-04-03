import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState, authUserSelector } from 'src/app/+store';

import { map, take } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { User } from 'src/app/shared';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(authUserSelector).pipe(
      map((user: User) => {
        if (user) {
          return true;
        }

        return this.router.navigate(['login']) && false;
      }),
      take(1)
    );
  }

}
