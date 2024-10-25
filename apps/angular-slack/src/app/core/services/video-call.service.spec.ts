import { AuthState } from '@angular-slack/app/+store';
import { channel, mockAuthService, mockSocket, mockStore, mockVideoCallDialogService, token, user } from '@angular-slack/app/mocks';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { Socket } from 'ngx-socket-io';
import { VideoCallDialogService } from 'ngx-webrtc-lib';

import { Events } from '@libs/models';
import { AuthService } from './auth.service';
import { VideoCallService } from './video-call.service';

describe('VideoCallService', () => {
  let service: VideoCallService;
  let socket: jasmine.SpyObj<Socket>;
  let store: jasmine.SpyObj<Store<AuthState>>;
  let authService: jasmine.SpyObj<AuthService>;
  let videoDialogService: jasmine.SpyObj<VideoCallDialogService>;

  beforeEach(() => {
    authService = mockAuthService();
    socket = mockSocket();
    store = mockStore();
    store.select.and.returnValue(of(user));
    videoDialogService = mockVideoCallDialogService();
    service = new VideoCallService(authService, socket, store, videoDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onCall', () => {
    it('should open dialog on "Events.Call" and emit "CallAccept"', () => {
      const dialog = {
        acceptCall: jasmine.createSpy,
        close: jasmine.createSpy,
        afterConfirmation: () => of({
          uid: user.uid,
          channel: user.uid,
          outcome: true,
          user: {
            name: user.displayName,
            photoURL: user.photoURL,
          },
        }),
        afterCallEnd: () => of(true),
      };

      videoDialogService.open.and.returnValue(dialog);
      socket.on.and.callFake((eventName, cb) => cb({ caller: user, receiver: user, channel: '1234' }));
      service.onCall();

      expect(videoDialogService.open).toHaveBeenCalled();
      expect(socket.emit).toHaveBeenCalledWith(Events.CallAccept, { caller: user, receiver: user, channel: '1234' });
    });

    it('should open dialog on "Events.Call" and emit "CallAccept"', () => {
      const dialog = {
        acceptCall: jasmine.createSpy,
        close: jasmine.createSpy,
        afterConfirmation: () => of(null),
        afterCallEnd: () => of(true),
      };

      videoDialogService.open.and.returnValue(dialog);
      socket.on.and.callFake((eventName, cb) => cb({ caller: user, receiver: user, channel: '1234' }));
      service.onCall();

      expect(videoDialogService.open).toHaveBeenCalled();
      expect(socket.emit).toHaveBeenCalledWith(Events.CallDecline, { caller: user, receiver: user, channel: '1234' });
    });
  });

  describe('call', () => {
    beforeEach(() => {
      authService.getRtcToken.and.returnValue(of(token));
    });

    it('should open videoCallDialog and emit only one single event', () => {
      const dialog = {
        acceptCall: jasmine.createSpy,
        close: jasmine.createSpy,
        afterConfirmation: () => of({
          uid: user.uid,
          channel: user.uid,
          outcome: true,
          user: {
            name: user.displayName,
            photoURL: user.photoURL,
          },
        }),
        afterCallEnd: () => of(true),
      };

      videoDialogService.open.and.returnValue(dialog);
      service.call(channel);

      expect(videoDialogService.open).toHaveBeenCalled();
      expect(socket.emit).toHaveBeenCalledOnceWith(Events.Call, {
        channel: `${user.uid}-${channel.createdBy.uid}`,
        caller: user,
        receiver: channel.createdBy,
      });
    });

    it('should open videoCallDialog and emit two events', () => {
      const dialog = {
        acceptCall: jasmine.createSpy,
        close: jasmine.createSpy,
        afterConfirmation: () => of(null),
        afterCallEnd: () => of(true),
      };

      videoDialogService.open.and.returnValue(dialog);
      service.call(channel);

      expect(videoDialogService.open).toHaveBeenCalled();
      expect(socket.emit).toHaveBeenCalledTimes(2);
    });
  });
});
