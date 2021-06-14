import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import {
  clearPhotoPreview,
  initProfile,
  updateProfile,
  userProfileLoadingSelector,
  userProfilePhotoPreviewSelector,
  userProfileUpdatedSelector,
} from '@angular-slack/app/+store';
import { mockDialogRef, mockStore, user } from '@angular-slack/app/mocks';
import { UserProfileEditComponent } from './user-profile-edit.component';

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let dialogRef: jasmine.SpyObj<MatDialogRef<UserProfileEditComponent>>;
  let store: jasmine.SpyObj<any>;

  beforeEach(() => {
    dialogRef = mockDialogRef();
    store = mockStore();
    component = new UserProfileEditComponent(user, dialogRef, store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'onCancel');

      store.select
        .withArgs(userProfileLoadingSelector).and.returnValue(of(true))
        .withArgs(userProfilePhotoPreviewSelector).and.returnValue(of('url'))
        .withArgs(userProfileUpdatedSelector).and.returnValue(of(true));

      component.ngOnInit();
    });

    it('should return true on loading$ subscribe', () => {
      component.loading$.subscribe((value: boolean) => {
        expect(value).toBeTrue();
      });
    });

    it('should return true on photoPreview$ subscribe', () => {
      component.photoPreview$.subscribe((value: string | ArrayBuffer) => {
        expect(value).toBe('url');
      });
    });

    it('should return true on updated$ subscribe', () => {
      component.updated$.subscribe((value: boolean) => {
        expect(value).toBeTrue();
      });
    });

    it('should dispatch initProfile action', () => {
      expect(store.dispatch).toHaveBeenCalledOnceWith(initProfile());
    });

    it('should create a form with one control', () => {
      expect(Object.keys(component.form.controls)).toEqual(['displayName']);
    });

    afterEach(() => {
      expect(component.onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy', () => {
    beforeEach(() => {
      component.sub$ = of(undefined).subscribe();
      spyOn(component.sub$, 'unsubscribe').and.callThrough();

      component.ngOnDestroy();
    });

    it('should unsubscribe from sub$', () => {
      expect(component.sub$.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFileUpload', () => {
    beforeEach(() => {
      spyOn(component['reader'], 'readAsDataURL');
      spyOn(component['reader'], 'onload').and.callThrough();
    });

    it('should dispatch 2 actions if files length is defined', () => {
      component.onFileUpload({ target: { files: [1] } } as any);
      component['reader'].onload(null);

      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should not dispatch action when length is 0', () => {
      component.onFileUpload({ target: { files: [] } } as any);
      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch action when files is undefined', () => {
      component.onFileUpload({ target: {} } as any);
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('onRemovePhoto', () => {
    it('should dispatch clearPhotoPreview action', () => {
      component.onRemovePhoto();
      expect(store.dispatch).toHaveBeenCalledOnceWith(clearPhotoPreview());
    });
  });

  describe('onCancel', () => {
    beforeEach(() => {
      component.onCancel();
    });

    it('should dispatch clearPhotoPreview action', () => {
      expect(store.dispatch).toHaveBeenCalledOnceWith(clearPhotoPreview());
    });

    it('should close the dialog', () => {
      expect(dialogRef.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component['buildForm']();
    });

    it('should not dispatch updateProfile when form is not valid', () => {
      component.form.patchValue({ displayName: '' });
      component.onSubmit();

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch updateProfile with photoURL null when form is valid', () => {
      component.form.patchValue({ displayName: 'Test' });
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledOnceWith(updateProfile({ payload: { user, photoURL: null } }));
    });

    it('should dispatch updateProfile with photoURL string when form is valid', () => {
      component.form.patchValue({ displayName: 'Test' });
      component['reader'] = { result: '1,2' } as any;
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledOnceWith(updateProfile({ payload: { user, photoURL: '2' } }));
    });
  });
});
