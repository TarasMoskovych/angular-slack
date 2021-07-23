import { defaultTheme } from '@angular-slack/app/+store/themes';
import { Theme } from '@angular-slack/app/shared';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class ThemesService {

  constructor() { }

  get(): Observable<Theme[]> {
    return of([defaultTheme]);
  }
}
