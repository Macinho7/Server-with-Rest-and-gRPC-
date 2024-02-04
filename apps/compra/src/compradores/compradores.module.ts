/* eslint-disable prettier/prettier */
import { CompradoresService } from './compradores.service';
import { CompradoresController } from './compradores.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constantes';
import { join } from 'path';
import { DadosModule } from 'apps/auth/src/dados/dados.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AUTH_PACKAGE_NAME } from '@app/lib/types/auth';

@Module({
  imports: [
    ConfigModule,
    DadosModule,
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto')
        }
      }
    ])
  ],
  controllers: [CompradoresController],
  providers: [CompradoresService],
  exports: [CompradoresService]
})
export class CompradoresModule {}
