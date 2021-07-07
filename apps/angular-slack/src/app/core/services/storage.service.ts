import { AuthError, b64toBlob } from '@angular-slack/app/shared';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
  ) { }

  uploadPhoto(path: string, b64Data: string): Observable<string> {
    const task = this.storage.upload(path, b64toBlob(b64Data));

    return from(task)
      .pipe(
        switchMap((data: UploadTaskSnapshot) => data.ref.getDownloadURL()),
        catchError((err: AuthError) => this.notificationService.handleError(err))
      );
  }
}
