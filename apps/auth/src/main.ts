/* eslint-disable prettier/prettier */
//import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {NestFactory} from '@nestjs/core';
import { AUTH_PACKAGE_NAME } from '@app/lib';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../auth.proto'),
      package: AUTH_PACKAGE_NAME
    }
  })

  await app.listen()
}
bootstrap();
