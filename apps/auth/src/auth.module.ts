/* eslint-disable prettier/prettier */
//import { Module } from '@nestjs/cli';
import { Module} from '@nestjs/common'
import { DadosModule } from './dados/dados.module';
import { CompradoresModule } from 'apps/compra/src/compradores/compradores.module';

@Module({
  imports: [DadosModule, CompradoresModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AuthModule {}
