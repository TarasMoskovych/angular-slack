import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { SideState, sidePhotoPreviewSelector, LoadPhoto, LoadPhotoSuccess, LoadPhotoError } from 'src/app/+store';

import { Observable } from 'rxjs';

import { User, GlobalErrorStateMatcher, errorMessages } from 'src/app/shared';

@Component({
  selector: 'app-side-panel-user-update',
  templateUrl: './side-panel-user-update.component.html',
  styleUrls: ['./side-panel-user-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelUserUpdateComponent implements OnInit {
  private reader = new FileReader();

  photoPreview$: Observable<string | ArrayBuffer>;
  matcher = new GlobalErrorStateMatcher();
  form: FormGroup;
  errorMessages = errorMessages;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private dialogRef: MatDialogRef<SidePanelUserUpdateComponent>,
    private store: Store<SideState>
  ) { }

  ngOnInit(): void {
    this.photoPreview$ = this.store.select(sidePhotoPreviewSelector);
    this.buildForm();
  }

  onFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files?.length) {
      this.reader.readAsDataURL(target.files[0]);
      this.reader.onload = () => this.store.dispatch(new LoadPhotoSuccess(this.reader.result));
    }
  }

  onRemovePhoto() {
    this.store.dispatch(new LoadPhotoError());
  }

  onCancel() {
    this.store.dispatch(new LoadPhotoError());
    this.dialogRef.close();
  }

  onSubmit() {

  }

  private buildForm() {
    this.form = new FormGroup({
      displayName: new FormControl(this.user.displayName, [Validators.required]),
    });
  }

}
