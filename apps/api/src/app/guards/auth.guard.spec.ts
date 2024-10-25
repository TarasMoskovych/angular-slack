import { ExecutionContext, HttpException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AuthGuard } from './auth.guard';

jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnThis(),
}));

describe('authGuard', () => {
  const authGuard = new AuthGuard();

  describe('canActivate', () => {
    it('should throw 401 error when token is not provided', () => {
      const mockContext = {
        switchToHttp() {
          return this;
        },
        getRequest() {
          return {
            headers: {},
          };
        },
      } as unknown as ExecutionContext;

      authGuard.canActivate(mockContext).catch((e: HttpException) => {
        expect(e.getStatus()).toBe(401);
      });
    });

    it('should throw 403 error when token is not valid', () => {
      const mockContext = {
        switchToHttp() {
          return this;
        },
        getRequest() {
          return {
            headers: {
              authorization: 'Bearer invalid-token',
            },
          };
        },
      } as unknown as ExecutionContext;

      (admin.auth as jest.Mock).mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValueOnce('Invalid token'),
      });

      authGuard.canActivate(mockContext).catch((e: HttpException) => {
        expect(e.getStatus()).toBe(403);
      });
    });

    it('should return true when token is valid', () => {
      const mockContext = {
        switchToHttp() {
          return this;
        },
        getRequest() {
          return {
            headers: {
              authorization: 'Bearer valid-token',
            },
          };
        },
      } as unknown as ExecutionContext;

      (admin.auth as jest.Mock).mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValueOnce({ key: 'value' }),
      });

      authGuard.canActivate(mockContext).then((status: boolean) => {
        expect(status).toBe(true);
      });
    });
  });
});
