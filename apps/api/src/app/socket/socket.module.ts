import { Module } from '@nestjs/common';
import { RtcAuthModule } from '../rtc-auth/rtc-auth.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [RtcAuthModule],
  providers: [SocketGateway],
})
export class SocketModule {}
