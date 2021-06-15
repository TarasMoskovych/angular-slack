import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { SocketModule } from './socket/socket.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    SocketModule,
    StatusModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
