import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, channelsSelectedSelector } from '../+store';
import { Channel } from '../shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  channel$: Observable<Channel>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.channel$ = this.store.select(channelsSelectedSelector);
  }
}
