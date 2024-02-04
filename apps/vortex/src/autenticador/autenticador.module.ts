/* eslint-disable prettier/prettier */
import { AutenticadorService } from './autenticador.service';
import { AutenticadorController } from './autenticador.controller';
import { JwtModule } from '@nestjs/jwt';
import { DadosCorretoraModule } from '../dados-corretora/dados-corretora.module';
import { CorretoraModule } from '../corretora/corretora.module';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DadosCorretoraModule,
    CorretoraModule,
    JwtModule.registerAsync({
      useFactory: (ConfigService: ConfigService) => {
        return {
          secret: ConfigService.get<string>('SEGREDO_TOKEN'),
          signOptions: { expiresIn: '1min'},
        }
      },
      inject: [ConfigService],
      global: true
    })
  ],
  controllers: [AutenticadorController],
  providers: [AutenticadorService],
  exports: [AutenticadorModule]
})
export class AutenticadorModule {}
