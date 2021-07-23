import { AuthError, b64toBlob } from '@angular-slack/app/shared';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: CoreModule
})
export class StorageService {
  progress$ = new BehaviorSubject<number>(null);

  constructor(
    private notificationService: NotificationService,
    private storage: AngularFireStorage,
  ) { }

  uploadPhoto(path: string, b64Data: string, showProgress = false): Observable<string> {
    const task = this.storage.upload(path, b64toBlob(b64Data));

    if (showProgress) {
      this.showProgress(task);
    }

    return from(task)
      .pipe(
        switchMap((data: UploadTaskSnapshot) => data.ref.getDownloadURL()),
        catchError((err: AuthError) => this.notificationService.handleError(err))
      );
  }

  showProgress(task: AngularFireUploadTask): void {
    task.percentageChanges()
      .subscribe((n: number) => this.progress$.next(n));
  }
}
