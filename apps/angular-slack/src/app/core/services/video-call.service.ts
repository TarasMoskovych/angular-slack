import { authUserSelector } from '@angular-slack/app/+store/auth/auth.selectors';
import { Channel } from '@angular-slack/app/shared';
import { Injectable } from '@angular/core';
import { Events, RtcEventPayload, User } from '@libs/models';
import { Store } from '@ngrx/store';

import { Socket } from 'ngx-socket-io';
import { VideoCallDialog, VideoCallDialogData, VideoCallDialogService } from 'ngx-webrtc-lib';

import { filter, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private available = true;
  private dialog: VideoCallDialog;

  constructor(
    private authService: AuthService,
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
    ).subscribe((user: User) => {
      const { uid } = user;

      this.socket.on(`${Events.Call}-${uid}`, ({ caller, channel, receiver, token }: RtcEventPayload) => {
        this.dialog = this.videoCallDialog.open({
          uid,
          channel,
          token,
          outcome: false,
          remoteUser: {
            name: caller.displayName,
            photoURL: caller.photoURL,
          },
          localUser: {
            name: user.displayName,
            photoURL: user.photoURL,
          },
        });

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
        tap((user: User) => {
          caller = user;
          channel = `${caller.uid}-${receiver.uid}`;
        }),
        switchMap(() => this.authService.getRtcToken({ channel, uid: caller.uid })),
        switchMap((token: string) => {
          this.dialog = this.videoCallDialog.open({
            uid: caller.uid,
            channel,
            token,
            outcome: true,
            remoteUser: {
              name: receiver.displayName,
              photoURL: receiver.photoURL,
            },
            localUser: {
              name: caller.displayName,
              photoURL: caller.photoURL,
            },
          });

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

  private emitEvent(eventName: Events, payload: RtcEventPayload): void {
    this.socket.emit(eventName, payload);
  }
}
