import { Component, OnInit, ChangeDetectionStrategy, Inject, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import {
  UserProfileState,
  userProfilePhotoPreviewSelector,
  userProfileLoadingSelector,
  userProfileUpdatedSelector,
  LoadPhotoPreviewSuccess,
  ClearPhotoPreview,
  LoadPhotoPreview,
  Update,
  Init,
} from 'src/app/+store';

import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { GlobalErrorStateMatcher, errorMessages, User } from 'src/app/shared';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileEditComponent implements OnInit {
  private reader = new FileReader();

  loading$: Observable<boolean>;
  photoPreview$: Observable<string | ArrayBuffer>;
  updated$: Observable<boolean>;
  sub$: Subscription;

  matcher = new GlobalErrorStateMatcher();
  form: FormGroup;
  errorMessages = errorMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<UserProfileEditComponent>,
    private store: Store<UserProfileState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new Init());

    this.loading$ = this.store.select(userProfileLoadingSelector);
    this.photoPreview$ = this.store.select(userProfilePhotoPreviewSelector);
    this.updated$ = this.store.select(userProfileUpdatedSelector);
    this.buildForm();

    this.sub$ = this.updated$
      .pipe(delay(1000))
      .subscribe((updated: boolean) => updated && this.onCancel());
  }

  onFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files?.length) {
      this.store.dispatch(new LoadPhotoPreview());
      this.reader.readAsDataURL(target.files[0]);
      this.reader.onload = () => this.store.dispatch(new LoadPhotoPreviewSuccess(this.reader.result));
    }
  }

  onRemovePhoto() {
    this.clearPhotoPreview();
  }

  onCancel() {
    this.clearPhotoPreview();
    this.sub$.unsubscribe();
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    const { displayName } = this.form.value;
    const user = { ...this.user, displayName };
    const photoURL = this.reader.result ? String(this.reader.result).split(',')[1] : null;

    this.store.dispatch(new Update({ user, photoURL }));
  }

  private buildForm() {
    this.form = new FormGroup({
      displayName: new FormControl(this.user.displayName, [Validators.required]),
    });
  }

  private clearPhotoPreview() {
    this.reader = new FileReader();
    this.store.dispatch(new ClearPhotoPreview());
  }

}
