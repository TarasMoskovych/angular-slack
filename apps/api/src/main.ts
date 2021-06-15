import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as fs from 'firebase-admin';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  const port = process.env.PORT || 3001;

  app.setGlobalPrefix(globalPrefix);
  app.useWebSocketAdapter(new IoAdapter(app));

  fs.initializeApp({
    credential: fs.credential.cert(environment.firebase as any),
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
