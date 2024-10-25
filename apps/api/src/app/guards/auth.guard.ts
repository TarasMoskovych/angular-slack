import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split('Bearer ')?.[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const idToken = await auth().verifyIdToken(token);
      return !!idToken;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
