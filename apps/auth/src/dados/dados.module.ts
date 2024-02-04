/* eslint-disable prettier/prettier */
//import { Module } from '@nestjs/common';
import { DadosService } from './dados.service';
import { DadosController } from './dados.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DadosController],
  providers: [DadosService],
})
export class DadosModule {}
