import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServiceAccount, initializeApp, credential } from 'firebase-admin';
import { port as defaultPort } from '@libs/models'

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  const port = process.env.PORT || defaultPort;

  app.setGlobalPrefix(globalPrefix);
  app.useWebSocketAdapter(new IoAdapter(app));

  initializeApp({
    credential: credential.cert(environment.firebase as ServiceAccount),
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
