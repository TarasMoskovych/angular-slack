import { Channel, User } from '@angular-slack/app/shared';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { authUserSelector } from '@angular-slack/app/+store/auth/auth.selectors';
import { Events } from '@libs/models';

import { Socket } from 'ngx-socket-io';
import { VideoCallDialogService, VideoCallDialog, VideoCallDialogData } from 'ngx-webrtc-lib';

import { filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private available = true;
  private dialog: VideoCallDialog;

  constructor(
    private socket: Socket,
    private store: Store,
    private videoCallDialog: VideoCallDialogService,
  ) {
    this.onCall();
  }

  onCall() {
    this.store.select(authUserSelector).pipe(
      filter((user: User) => !!user),
      take(1),
    ).subscribe(({ uid }: User) => {
      this.socket.on(`${Events.Call}-${uid}`, ({ caller, channel, receiver }) => {
        this.dialog = this.openVideoCallDialog(caller, channel, false);

        this.dialog.afterConfirmation().subscribe((data: VideoCallDialogData) => {
          this.emitEvent(Events[data ? 'CallAccept' : 'CallDecline'], { channel, caller: receiver, receiver: caller });
        });

        this.onAfterCallEnd();
      });

      this.socket.on(`${Events.CallAccept}-${uid}`, () => {
        if (this.dialog) {
          this.dialog.acceptCall();
        }
      });

      this.socket.on(`${Events.CallDecline}-${uid}`, () => {
        if (this.dialog) {
          this.dialog.close();
        }
      });
    });
  }

  call({ createdBy: receiver }: Channel): void {
    let channel: string;
    let caller: User;

    this.store.select(authUserSelector)
      .pipe(
        filter(() => this.available),
        switchMap((user: User) => {
          caller = user;
          channel = `${caller.uid}-${receiver.uid}`;

          this.dialog = this.openVideoCallDialog(receiver, channel, true);
          this.available = false;
          this.onAfterCallEnd();
          this.emitEvent(Events.Call, { channel, caller, receiver });

          return this.dialog.afterConfirmation();
        }),
        tap((data: VideoCallDialogData) => {
          if (data === null) {
            this.emitEvent(Events.CallDecline, { channel, caller, receiver });
          }
        }),
        take(1),
      )
      .subscribe();
  }

  private onAfterCallEnd(): void {
    if (this.dialog) {
      this.dialog.afterCallEnd().subscribe(() => this.available = true);
    }
  }

  private openVideoCallDialog(user: User, channel: string, outcome: boolean): VideoCallDialog {
    const { displayName: name, photoURL, uid } = user;

    return this.videoCallDialog.open({
      channel,
      outcome,
      uid,
      user: { name, photoURL },
    });
  }

  private emitEvent(eventName: Events, { channel, caller, receiver }): void {
    this.socket.emit(eventName, { channel, caller, receiver });
  }
}
