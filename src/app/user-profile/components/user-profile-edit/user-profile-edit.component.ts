import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import {
  UserProfileState,
  userProfilePhotoPreviewSelector,
  userProfileLoadingSelector,
  userProfileUpdatedSelector,
  loadPhotoPreviewSuccess,
  clearPhotoPreview,
  loadPhotoPreview,
  initProfile,
  updateProfile,
} from 'src/app/+store';

import { Observable, Subscription } from 'rxjs';

import { GlobalErrorStateMatcher, errorMessages, User } from 'src/app/shared';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
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
    this.store.dispatch(initProfile());

    this.loading$ = this.store.select(userProfileLoadingSelector);
    this.photoPreview$ = this.store.select(userProfilePhotoPreviewSelector);
    this.updated$ = this.store.select(userProfileUpdatedSelector);
    this.buildForm();

    this.sub$ = this.updated$
      .subscribe((updated: boolean) => updated && this.onCancel());
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  onFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files?.length) {
      this.store.dispatch(loadPhotoPreview());
      this.reader.readAsDataURL(target.files[0]);
      this.reader.onload = () => this.store.dispatch(loadPhotoPreviewSuccess({ photo: this.reader.result }));
    }
  }

  onRemovePhoto() {
    this.clearPhotoPreview();
  }

  onCancel() {
    this.clearPhotoPreview();
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) { return; }

    const { displayName } = this.form.value;
    const user = { ...this.user, displayName };
    const photoURL = this.reader.result ? String(this.reader.result).split(',')[1] : null;

    this.store.dispatch(updateProfile({ payload: { user, photoURL } }));
  }

  private buildForm() {
    this.form = new FormGroup({
      displayName: new FormControl(this.user.displayName, [Validators.required]),
    });
  }

  private clearPhotoPreview() {
    this.reader = new FileReader();
    this.store.dispatch(clearPhotoPreview());
  }

}
