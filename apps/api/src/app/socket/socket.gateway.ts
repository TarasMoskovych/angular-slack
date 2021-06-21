import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { EventEmitter2 } from 'eventemitter2';
import { Events, Status } from '@libs/models';
import { environment } from '@api/environments/environment';

@WebSocketGateway({ origins: environment.origins.split(' ') })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private users = [];

  constructor(private eventEmitter: EventEmitter2) { }

  async handleConnection(socket: Socket) {
    this.server.emit(Events.Init);
    this.users.push({ id: socket.id });
  }

  async handleDisconnect(socket: Socket) {
    const user = this.users.find((user) => user.id === socket.id);
    this.users = this.users.filter((user) => user.id !== socket.id);

    if (user?.uid) {
      this.eventEmitter.emit(`${Events.Status}.${Status.OFFLINE}`, user.uid);
    }
  }

  @SubscribeMessage('status')
  async onStatus(socket: Socket, { uid, status }) {
    this.users.forEach((user) => {
      if (user.id === socket.id) {
        user.uid = uid;
      }
    });

    this.eventEmitter.emit(`${Events.Status}.${status}`, uid);
  }
}
