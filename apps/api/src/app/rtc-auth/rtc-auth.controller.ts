import { RtcToken } from '@libs/models';
import { Body, Controller, Post } from '@nestjs/common';
import { RtcAuthService } from './rtc-auth.service';
import { RtcTokenDto } from './rtc-token.dto';

@Controller('rtc')
export class RtcAuthController {
  constructor(private rtcAuthService: RtcAuthService) {}

  @Post('token')
  generateRtcToken(@Body() payload: RtcTokenDto): RtcToken {
    return this.rtcAuthService.generateRtcToken(payload);
  }
}
