import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, channelsSelectedSelector, getThemes, themesSelectedSelector } from '../+store';
import { Channel, Theme } from '../shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  channel$: Observable<Channel>;
  theme$: Observable<Theme>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.channel$ = this.store.select(channelsSelectedSelector);
    this.theme$ = this.store.select(themesSelectedSelector);
    this.store.dispatch(getThemes());
  }
}
