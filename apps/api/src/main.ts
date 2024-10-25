import { port as defaultPort } from '@libs/models';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { credential, initializeApp } from 'firebase-admin';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './app/filters/http-filter';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = process.env.PORT || defaultPort;

  app.enableCors({ origin: environment.origins });
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalPipes(new ValidationPipe())
    .useWebSocketAdapter(new IoAdapter(app));

  initializeApp({
    credential: credential.cert(JSON.parse(Buffer.from(environment.firebase, 'base64').toString('ascii'))),
  });

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
