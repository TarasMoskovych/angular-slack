import { Events, Status } from '@libs/models';
import { SocketGateway } from './socket.gateway';
import { mockEventEmitter } from '../mocks';

describe('SocketGateway', () => {
  const emitter = mockEventEmitter();
  const uid = '12345';
  let gateway: SocketGateway;

  beforeEach(() => {
    gateway = new SocketGateway(emitter as any);
    gateway.server = {
      emit: jest.fn(),
    };
  });

  it('should be created', () => {
    expect(gateway).toBeTruthy();
  });

  describe('handleConnection', () => {
    it('should emit "Init" event', () => {
      gateway.handleConnection({ id: '1' });

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
      gateway.handleDisconnect({ id: '1' });

      expect(emitter.emit).toHaveBeenCalledWith(`${Events.Status}.${Status.OFFLINE}`, uid);
      expect(gateway['users']).toEqual([{ id: '2', uid }]);
    });

    it('should not emit status changed event when user uid is not defined', () => {
      gateway['users'] = [
        {
          id: '1',
        },
      ];
      gateway.handleDisconnect({ id: '1' });

      expect(emitter.emit).not.toHaveBeenCalledWith();
      expect(gateway['users']).toEqual([]);
    });

    it('should not emit status changed event when user is undefined', () => {
      gateway.handleDisconnect({ id: '1' });

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
      gateway.onStatus({ id: '1' }, { uid, status: Status.ONLINE });

      expect(emitter.emit).toHaveBeenCalledWith(`${Events.Status}.${Status.ONLINE}`, uid);
    });

    it('should emit status changed event with new user', () => {
      gateway.onStatus({ id: '2' }, { uid, status: Status.ONLINE });

      expect(emitter.emit).toHaveBeenCalledWith(`${Events.Status}.${Status.ONLINE}`, uid);
    });
  });
});
