import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RtcAuthModule } from './rtc-auth/rtc-auth.module';
import { SocketModule } from './socket/socket.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    RtcAuthModule,
    SocketModule,
    StatusModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
