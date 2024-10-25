import { EventEmitter2 } from '@nestjs/event-emitter';
import { RtcAuthService } from '../rtc-auth/rtc-auth.service';

export const mockFirestore = () => {
  return {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
  };
};

export const mockEventEmitter = () => {
  return {
    emit: jest.fn(),
  } as unknown as EventEmitter2;
};

export const mockRtcAuthService = () => {
  return {
    generateRtcToken: jest.fn().mockReturnValue({ token: 'mock-token' }),
    generateAgoraRtcToken: jest.fn(),
  } as unknown as RtcAuthService;
};
