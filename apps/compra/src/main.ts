/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core'
import { appModule } from './app.module';
import helmet from 'helmet'
import * as compression from 'compression'

async function bootstrap() {
  const app = await NestFactory.create(appModule);
  app.use(helmet())
  app.use(compression({threshold: 500}))
  await app.listen(8080);
}
bootstrap();
