/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import helmet from 'helmet'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.use(helmet({contentSecurityPolicy: true, referrerPolicy: true, strictTransportSecurity: true, noSniff: false}))
  app.use(helmet.frameguard({
    action: "deny"
  }))
  app.use(cookieParser())
  app.use(compression({
    filter: () => { return true},
    threshold: 500
  }))
  app.use(session({
    secret: 'segredao',
    resave: false,
    saveUninitialized: false,
  }))
  useContainer(app.select(AppModule), { fallback: true });
  await app.listen((3000));
}
bootstrap();
