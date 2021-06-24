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

  @SubscribeMessage('status')
  async onStatus(socket: Socket, { uid, status }) {
    this.users.forEach((user: User) => {
      if (user.id === socket.id) {
        user.uid = uid;
      }
    });

    this.eventEmitter.emit(`${Events.Status}.${status}`, uid);
  }
}
