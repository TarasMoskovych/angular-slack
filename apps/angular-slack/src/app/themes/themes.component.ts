import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { defaultTheme, getThemes, themesSelector, ThemesState } from '../+store/themes';
import { Theme } from '../shared';
import { ThemePickerComponent } from './components';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesComponent implements OnInit {
  themes$: Observable<Theme[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<ThemesState>,
  ) { }

  ngOnInit(): void {
    this.themes$ = this.store.select(themesSelector);
    this.store.dispatch(getThemes());
  }

  onAdd(): void {
    const dialog = this.dialog.open(ThemePickerComponent, {
      backdropClass: 'themes-overlay',
      panelClass: 'themes-wrapper',
      data: { ...defaultTheme },
    });

    dialog.afterClosed()
      .pipe(take(1))
      .subscribe((theme: Theme) => console.log(theme));
  }
}
