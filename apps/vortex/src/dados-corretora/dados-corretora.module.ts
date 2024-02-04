/* eslint-disable prettier/prettier */
//import { Module, forwardRef } from '@nestjs/common';
import { DadosCorretoraService } from './dados-corretora.service';
import { DadosCorretoraController } from './dados-corretora.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosCorretoraEntity } from './dados-corretora.entity';
import { CorretoraEntity } from '../corretora/corretora.entity';
import { CorretoraModule } from '../corretora/corretora.module';
import { JwtModule } from '@nestjs/jwt';
import { Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([DadosCorretoraEntity, CorretoraEntity]), 
      forwardRef(() => CorretoraModule)
  ],
  controllers: [DadosCorretoraController],
  providers: [DadosCorretoraService],
  exports: [DadosCorretoraModule, DadosCorretoraService]
})
export class DadosCorretoraModule {}
