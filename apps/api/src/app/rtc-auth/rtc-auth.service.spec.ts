import { RtcTokenPayload } from '@libs/models';
import { Test, TestingModule } from '@nestjs/testing';
import { RtcTokenBuilder } from 'agora-token';
import { RtcAuthService } from './rtc-auth.service';

describe('RtcAuthService', () => {
  let service: RtcAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtcAuthService],
    }).compile();

    service = module.get<RtcAuthService>(RtcAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateRtcToken', () => {
    it('should return a token', () => {
      const token = 'mock-token';
      const payload: RtcTokenPayload = {
        channel: 'channel_1234',
        uid: 'user_1234',
      };

      jest.spyOn(RtcTokenBuilder, 'buildTokenWithUid').mockReturnValue(token);
      expect(service.generateRtcToken(payload)).toEqual({ token });
    });
  });
});
