/* eslint-disable prettier/prettier */
//import { Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CompradoresModule } from './compradores/compradores.module';
import 'reflect-metadata';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    CompradoresModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class appModule {}
