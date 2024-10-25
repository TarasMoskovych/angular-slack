import { mockRtcAuthService } from '../mocks';
import { RtcAuthController } from './rtc-auth.controller';
import { RtcTokenDto } from './rtc-token.dto';

describe('RtcAuthController', () => {
  const rtcAuthService = mockRtcAuthService();
  const controller = new RtcAuthController(rtcAuthService);

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateRtcToken', () => {
    it('should call generateRtcToken method of rtcAuthService', () => {
      const payload: RtcTokenDto = {
        channel: 'channel_1234',
        uid: 'user_1234',
      };

      controller.generateRtcToken(payload);
      expect(rtcAuthService.generateRtcToken).toHaveBeenCalledWith(payload);
    });
  });
});
