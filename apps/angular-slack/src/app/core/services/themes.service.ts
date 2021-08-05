import { DEFAULT_THEME } from '@angular-slack/app/+store/themes';
import { Theme } from '@angular-slack/app/shared';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class ThemesService {
  private themesKey = 'angular-slack:themes';
  private selectedKey = 'angular-slack:selected-theme';

  constructor(@Inject('LocalStorage') private localStorage: Storage) { }

  get(): Observable<{ themes: Theme[], selected: Theme }> {
    const themes = [DEFAULT_THEME, ...this.getThemes()];
    const selected: Theme = this._get(this.selectedKey) || { id: DEFAULT_THEME.id };

    return of({
      themes,
      selected: themes.find((th: Theme) => th.id === selected.id),
    });
  }

  add(theme: Theme): Observable<Theme> {
    this._set(this.themesKey, [...this.getThemes(), theme]);
    this.select(theme);

    return of(theme);
  }

  edit(theme: Theme): Observable<Theme> {
    const themes = [...this.getThemes()];
    themes.splice(themes.findIndex((item: Theme) => theme.id === item.id), 1, theme);
    this._set(this.themesKey, themes);
    this.select(theme);

    return of(theme);
  }

  select(theme: Theme): Observable<Theme> {
    this._set(this.selectedKey, { id: theme.id });

    return of(theme);
  }

  remove(theme: Theme): Observable<Theme> {
    const themes = this.getThemes().filter((item: Theme) => item.id !== theme.id);
    const selected: Theme = this._get(this.selectedKey);
    this._set(this.themesKey, themes);

    if (selected && selected.id === theme.id) {
      this._set(this.selectedKey, { id: DEFAULT_THEME.id });
    }

    return of(theme);
  }

  getThemes(): Theme[] {
    return this._get(this.themesKey) || [];
  }

  private _get(key: string): any {
    return JSON.parse(this.localStorage.getItem(key));
  }

  private _set(key: string, data: any) {
    this.localStorage.setItem(key, JSON.stringify(data));
  }
}
