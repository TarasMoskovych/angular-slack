import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { environment } from '@api/environments/environment';
import { Events, Status } from '@libs/models';
import { Socket, Server } from 'socket.io';
import { EventEmitter2 } from 'eventemitter2';
import { User } from '../models';

@WebSocketGateway({ origins: environment.origins.split(' ') })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users: User[] = [];

  constructor(private eventEmitter: EventEmitter2) { }

  async handleConnection(socket: Socket) {
    this.server.emit(Events.Init);
    this.users.push({ id: socket.id });
  }

  async handleDisconnect(socket: Socket) {
    const user = this.users.find((user: User) => user.id === socket.id);
    this.users = this.users.filter((user: User) => user.id !== socket.id);

    if (user?.uid) {
      this.eventEmitter.emit(`${Events.Status}.${Status.OFFLINE}`, user.uid);
    }
  }

  @SubscribeMessage(Events.Status)
  async onStatus(socket: Socket, { uid, status }) {
    this.users.forEach((user: User) => {
      if (user.id === socket.id) {
        user.uid = uid;
      }
    });

    this.eventEmitter.emit(`${Events.Status}.${status}`, uid);
  }

  @SubscribeMessage(Events.Call)
  async onCall(socket: Socket, { channel, caller, receiver }) {
    this.emitCallEvent(`${Events.Call}-${receiver.uid}`, { channel, caller, receiver });
  }

  @SubscribeMessage(Events.CallAccept)
  async onCallAccept(socket: Socket, { channel, caller, receiver }) {
    this.emitCallEvent(`${Events.CallAccept}-${receiver.uid}`, { channel, caller, receiver });
  }

  @SubscribeMessage(Events.CallDecline)
  async onCallDecline(socket: Socket, { channel, caller, receiver }) {
    this.emitCallEvent(`${Events.CallDecline}-${receiver.uid}`, { channel, caller, receiver });
  }

  private emitCallEvent(event: string, { channel, caller, receiver }): void {
    const socketId = this.getReceiverSocket(receiver);

    if (socketId) {
      this.server.to(socketId).emit(event, { channel, caller, receiver });
    }
  }

  private getReceiverSocket(receiver: User): string {
    return this.users.find((user: User) => user.uid === receiver.uid)?.id;
  }
}
