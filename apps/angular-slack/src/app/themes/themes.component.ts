import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColorEvent } from 'ngx-color';
import { Observable } from 'rxjs';

import { getThemes, themesSelector, ThemesState } from '../+store/themes';
import { Theme } from '../shared';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemesComponent implements OnInit {
  themes$: Observable<Theme[]>;

  constructor(private store: Store<ThemesState>) { }

  ngOnInit(): void {
    this.themes$ = this.store.select(themesSelector);
    this.store.dispatch(getThemes());
  }

  onAdd(): void {
    console.log('on add');
  }

  onHandleChange(data: ColorEvent): void {
    console.log(data.color);
  }
}
