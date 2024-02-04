/* eslint-disable prettier/prettier */
//import { Module, forwardRef } from '@nestjs/common';
import { CorretoraService } from './corretora.service';
import { CorretoraController } from './corretora.controller';
import { CorretoraEntity } from './corretora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosCorretoraEntity } from '../dados-corretora/dados-corretora.entity';
import { DadosCorretoraModule } from '../dados-corretora/dados-corretora.module';
import { Module, forwardRef } from '@nestjs/common';
import { NomeEhUnicoValidator } from '../recursos/validar/nome-eh-unico';

@Module({
  imports: [
    TypeOrmModule.forFeature([CorretoraEntity, DadosCorretoraEntity]),
      forwardRef(() => DadosCorretoraModule)
  ],
  controllers: [CorretoraController],
  providers: [CorretoraService, NomeEhUnicoValidator],
  exports: [CorretoraService]
})
export class CorretoraModule {}
