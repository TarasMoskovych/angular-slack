import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import {
  AppState,
  AddChannelInit,
  AddChannel,
  channelsAddedSelector,
  channelsLoadingSelector,
} from 'src/app/+store';

import { Subscription, Observable } from 'rxjs';

import { Channel } from 'src/app/shared';

@Component({
  selector: 'app-channels-modal',
  templateUrl: './channels-modal.component.html',
  styleUrls: ['./channels-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsModalComponent implements OnInit, OnDestroy {
  private sub$: Subscription;

  loading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<ChannelsModalComponent>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new AddChannelInit());

    this.loading$ = this.store.select(channelsLoadingSelector);
    this.sub$ = this.store.select(channelsAddedSelector).subscribe((added: boolean) => added && this.onClose());
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onChannelAdd(channel: Channel) {
    this.store.dispatch(new AddChannel(channel));
  }

  onClose() {
    this.dialogRef.close();
  }
}
