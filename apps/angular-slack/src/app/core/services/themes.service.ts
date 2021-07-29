import { defaultTheme } from '@angular-slack/app/+store/themes';
import { Theme } from '@angular-slack/app/shared';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class ThemesService {
  private key = 'themes';

  constructor(@Inject('LocalStorage') private localStorage: Storage) { }

  add(theme: Theme): Observable<Theme> {
    this.saveTheme(theme);
    return of(theme);
  }

  get(): Observable<Theme[]> {
    return of([defaultTheme, ...this.getThemes()]);
  }

  private getThemes(): Theme[] {
    return JSON.parse(this.localStorage.getItem(this.key) || '[]');
  }

  private saveTheme(theme: Theme): void {
    this.localStorage.setItem(this.key, JSON.stringify([...this.getThemes(), theme]));
  }
}
