import { environment } from '@api/environments/environment';
import { RtcToken, RtcTokenPayload } from '@libs/models';
import { Injectable } from '@nestjs/common';
import { RtcTokenBuilder, RtcRole } from 'agora-token';

const TOKEN_EXPIRATION_IN_SECONDS = 3600;
const PRIVILEGE_EXPIRATION_IN_SECONDS = 3600;

@Injectable()
export class RtcAuthService {

  generateRtcToken(payload: RtcTokenPayload): RtcToken {
    return {
      token: this.generateAgoraRtcToken(payload),
    };
  }

  private generateAgoraRtcToken({ channel, uid }: RtcTokenPayload): string {
    return RtcTokenBuilder.buildTokenWithUid(
      environment.webRtc.AppID,
      environment.webRtc.AppCertificate,
      channel,
      uid,
      RtcRole.PUBLISHER,
      TOKEN_EXPIRATION_IN_SECONDS,
      PRIVILEGE_EXPIRATION_IN_SECONDS,
    );
  }
}
