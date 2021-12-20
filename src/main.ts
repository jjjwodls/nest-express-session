import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      credentials: true,
      origin: true,
    },
  });
  app.set('trust proxy', 1);
  const sessionOption = {
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  };

  app.use(session(sessionOption));
  app.use(cookieParser());

  await app.listen(3001);
}
bootstrap();
