/* eslint-disable prettier/prettier */
import { CorretoraModule } from './corretora/corretora.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres-config-service';
import { redisStore } from 'cache-manager-redis-yet';
import { DadosCorretoraModule } from './dados-corretora/dados-corretora.module';
import { AutenticadorModule } from './autenticador/autenticador.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { NomeEhUnicoValidator } from './recursos/validar/nome-eh-unico';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


@Module({
  imports: [
    CorretoraModule, DadosCorretoraModule, AutenticadorModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({useClass: PostgresConfigService, inject: [PostgresConfigService]}),

    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'Variable',
        ttl: 20000,
        limit: 5,
      },   
    ]),
  ],
  providers: [
    NomeEhUnicoValidator,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: ConsoleLogger,
      useClass: ConsoleLogger
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    
  ],
})
export class AppModule {}
