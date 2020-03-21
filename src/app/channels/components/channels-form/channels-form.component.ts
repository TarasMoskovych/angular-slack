import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import {
  ChannelsState,
  AddChannel,
  AddChannelInit,
  channelsLoadingSelector,
  channelsAddedSelector,
} from 'src/app/+store/channels';

import { Observable, Subscription } from 'rxjs';

import { GlobalErrorStateMatcher, errorMessages } from 'src/app/shared';

@Component({
  selector: 'app-channels-form',
  templateUrl: './channels-form.component.html',
  styleUrls: ['./channels-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsFormComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  sub$: Subscription;

  form: FormGroup;
  matcher = new GlobalErrorStateMatcher();
  errorMessages = errorMessages;

  constructor(
    private store: Store<ChannelsState>,
    private dialogRef: MatDialogRef<ChannelsFormComponent>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new AddChannelInit());

    this.loading$ = this.store.select(channelsLoadingSelector);
    this.sub$ = this.store.select(channelsAddedSelector).subscribe((added: boolean) => added && this.onCancel());
    this.buildForm();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    this.store.dispatch(new AddChannel(this.form.value));
  }

  onCancel() {
    this.dialogRef.close();
  }

  private buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

}
