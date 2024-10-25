import { environment } from '@api/environments/environment';
import { Events, RtcEventPayload, Status } from '@libs/models';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { EventEmitter2 } from 'eventemitter2';
import { Server, Socket } from 'socket.io';
import { UserEntity } from '../models';
import { RtcAuthService } from '../rtc-auth/rtc-auth.service';

@WebSocketGateway({
  cors: {
    origin: environment.origins,
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users: UserEntity[] = [];

  constructor(
    private eventEmitter: EventEmitter2,
    private rtcAuthService: RtcAuthService,
  ) {
    console.log('Allowed origins: ', environment.origins);
  }

  async handleConnection(socket: Socket) {
    this.server.emit(Events.Init);
    this.users.push({ id: socket.id });
  }

  async handleDisconnect(socket: Socket) {
    const user = this.users.find((user: UserEntity) => user.id === socket.id);
    this.users = this.users.filter((user: UserEntity) => user.id !== socket.id);

    if (user?.uid) {
      this.eventEmitter.emit(`${Events.Status}.${Status.OFFLINE}`, user.uid);
    }
  }

  @SubscribeMessage(Events.Status)
  async onStatus(socket: Socket, { uid, status }) {
    this.users.forEach((user: UserEntity) => {
      if (user.id === socket.id) {
        user.uid = uid;
      }
    });

    this.eventEmitter.emit(`${Events.Status}.${status}`, uid);
  }

  @SubscribeMessage(Events.Call)
  async onCall(socket: Socket, payload: RtcEventPayload) {
    const { token } = this.rtcAuthService.generateRtcToken({
      channel: payload.channel,
      uid: payload.receiver.uid,
    });

    this.emitCallEvent(`${Events.Call}-${payload.receiver.uid}`, {
      ...payload,
      token,
    });
  }

  @SubscribeMessage(Events.CallAccept)
  async onCallAccept(socket: Socket, payload: RtcEventPayload) {
    this.emitCallEvent(`${Events.CallAccept}-${payload.receiver.uid}`, payload);
  }

  @SubscribeMessage(Events.CallDecline)
  async onCallDecline(socket: Socket, payload: RtcEventPayload) {
    this.emitCallEvent(`${Events.CallDecline}-${payload.receiver.uid}`, payload);
  }

  private emitCallEvent(event: string, payload: RtcEventPayload): void {
     this.getReceiverSockets(payload.receiver.uid).forEach((socketId: string) => {
      this.server.to(socketId).emit(event, payload);
    });
  }

  private getReceiverSockets(uid: string): string[] {
    return this.users
      .filter((user: UserEntity) => user.uid === uid)
      .map((user: UserEntity) => user.id);
  }
}
