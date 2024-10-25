import { Events, RtcEventPayload, Status } from '@libs/models';
import { Socket } from 'socket.io';

import { mockEventEmitter, mockRtcAuthService } from '../mocks';
import { SocketGateway } from './socket.gateway';

describe('SocketGateway', () => {
  const emitter = mockEventEmitter();
  const rtcAuthService = mockRtcAuthService();
  const uid = '12345';
  let gateway: SocketGateway;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);

    gateway = new SocketGateway(emitter, rtcAuthService);
    gateway.server = {
      emit: jest.fn(),
      to: jest.fn().mockReturnThis(),
    } as any;
  });

  it('should be created', () => {
    expect(gateway).toBeTruthy();
  });

  describe('handleConnection', () => {
    it('should emit "Init" event', () => {
      gateway.handleConnection({ id: '1' } as Socket);
      expect(gateway.server.emit).toHaveBeenCalledWith(Events.Init);
    });
  });

  describe('handleDisconnect', () => {
    it('should emit status changed event when user is defined', () => {
      gateway['users'] = [
        {
          id: '1',
          uid,
        },
        {
          id: '2',
          uid,
        },
      ];
      gateway.handleDisconnect({ id: '1' } as Socket);

      expect(emitter.emit).toHaveBeenCalledWith(`${Events.Status}.${Status.OFFLINE}`, uid);
      expect(gateway['users']).toEqual([{ id: '2', uid }]);
    });

    it('should not emit status changed event when user uid is not defined', () => {
      gateway['users'] = [
        {
          id: '1',
        },
      ];
      gateway.handleDisconnect({ id: '1' } as Socket);

      expect(emitter.emit).not.toHaveBeenCalledWith();
      expect(gateway['users']).toEqual([]);
    });

    it('should not emit status changed event when user is undefined', () => {
      gateway.handleDisconnect({ id: '1' } as Socket);
      expect(emitter.emit).not.toHaveBeenCalledWith();
    });
  });

  describe('onStatus', () => {
    beforeEach(() => {
      gateway['users'] = [
        {
          id: '1',
        },
      ];
    });

    it('should emit status changed event with existing user', () => {
      gateway.onStatus({ id: '1' } as Socket, { uid, status: Status.ONLINE });
      expect(emitter.emit).toHaveBeenCalledWith(`${Events.Status}.${Status.ONLINE}`, uid);
    });

    it('should emit status changed event with new user', () => {
      gateway.onStatus({ id: '2' } as Socket, { uid, status: Status.ONLINE });
      expect(emitter.emit).toHaveBeenCalledWith(`${Events.Status}.${Status.ONLINE}`, uid);
    });
  });

  describe('onCall', () => {
    const data = {
      channel: '5',
      caller: {
        uid: '2',
      },
      receiver: {
        uid: '1',
      },
      token: 'mock-token',
    } as RtcEventPayload;

    it('should emit "Events.Call" event when socket is defined', () => {
      gateway['users'] = [
        {
          id: 'socket-10',
          uid: '1',
        },
      ];

      gateway.onCall(null, data);

      expect(gateway.server.to).toHaveBeenCalledWith('socket-10');
      expect(gateway.server.emit).toHaveBeenCalledWith(`${Events.Call}-${data.receiver.uid}`, data);
    });

    it('should not emit "Events.Call" event when socket is undefined', () => {
      gateway['users'] = [
        {
          id: 'socket-10',
          uid: '2',
        },
      ];

      gateway.onCall(null, data);
      expect(gateway.server.emit).not.toHaveBeenCalled();
    });
  });

  describe('onCallAccept', () => {
    const data = {
      channel: '5',
      caller: {
        uid: '2',
      },
      receiver: {
        uid: '1',
      },
    } as RtcEventPayload;

    it('should emit "Events.CallAccept" event when socket is defined', () => {
      gateway['users'] = [
        {
          id: 'socket-10',
          uid: '1',
        },
      ];

      gateway.onCallAccept(null, data);

      expect(gateway.server.to).toHaveBeenCalledWith('socket-10');
      expect(gateway.server.emit).toHaveBeenCalledWith(`${Events.CallAccept}-${data.receiver.uid}`, data);
    });

    it('should not emit "Events.CallAccept" event when socket is undefined', () => {
      gateway['users'] = [
        {
          id: 'socket-10',
          uid: '2',
        },
      ];

      gateway.onCallAccept(null, data);
      expect(gateway.server.emit).not.toHaveBeenCalled();
    });
  });

  describe('onCallDecline', () => {
    const data = {
      channel: '5',
      caller: {
        uid: '2',
      },
      receiver: {
        uid: '1',
      },
    } as RtcEventPayload;

    it('should emit "Events.CallDecline" event when socket is defined', () => {
      gateway['users'] = [
        {
          id: 'socket-10',
          uid: '1',
        },
      ];

      gateway.onCallDecline(null, data);

      expect(gateway.server.to).toHaveBeenCalledWith('socket-10');
      expect(gateway.server.emit).toHaveBeenCalledWith(`${Events.CallDecline}-${data.receiver.uid}`, data);
    });

    it('should not emit "Events.CallDecline" event when socket is undefined', () => {
      gateway.onCallDecline(null, data);
      expect(gateway.server.emit).not.toHaveBeenCalled();
    });
  });
});
