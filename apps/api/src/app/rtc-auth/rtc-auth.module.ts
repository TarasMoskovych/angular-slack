import { Module } from '@nestjs/common';
import { RtcAuthController } from './rtc-auth.controller';
import { RtcAuthService } from './rtc-auth.service';

@Module({
  controllers: [RtcAuthController],
  providers: [RtcAuthService],
  exports: [RtcAuthService],
})
export class RtcAuthModule {}
