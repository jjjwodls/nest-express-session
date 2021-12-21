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

  app.use(cookieParser('my-secret'));
  const sessionOption = {
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  };
  app.use(session(sessionOption));

  await app.listen(3001);
}
bootstrap();
