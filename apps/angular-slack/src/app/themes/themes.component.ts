import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import {
  DEFAULT_THEME,
  addTheme,
  removeTheme,
  selectTheme,
  themesSelectedSelector,
  themesSelector,
  ThemesState,
  editTheme,
} from '../+store/themes';
import { Theme } from '../shared';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesComponent implements OnInit {
  selected$: Observable<Theme>;
  themes$: Observable<Theme[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<ThemesState>,
  ) { }

  ngOnInit(): void {
    this.selected$ = this.store.select(themesSelectedSelector);
    this.themes$ = this.store.select(themesSelector);
  }

  async onAdd(): Promise<void> {
    const dialog = await this.openDialog({ ...DEFAULT_THEME, edit: true });

    dialog.afterClosed()
      .pipe(take(1))
      .subscribe((theme: Theme) => theme && this.store.dispatch(addTheme({ theme: { ...theme, id: Date.now() } })));
  }

  async onEdit(data: Theme): Promise<void> {
    const dialog = await this.openDialog({ ...data });

    dialog.afterClosed()
      .pipe(take(1))
      .subscribe((theme: Theme) => theme && this.store.dispatch(editTheme({ theme })));
  }

  onSelect(theme: Theme): void {
    this.store.dispatch(selectTheme({ theme }));
  }

  onRemove(theme: Theme): void {
    this.store.dispatch(removeTheme({ theme }));
  }

  private async openDialog(data: Theme): Promise<MatDialogRef<any>> {
    const { ThemePickerComponent } = await import('./components/theme-picker/theme-picker.component');

    return this.dialog.open(ThemePickerComponent, {
      backdropClass: 'themes-overlay',
      panelClass: 'themes-wrapper',
      data,
    });
  }
}
