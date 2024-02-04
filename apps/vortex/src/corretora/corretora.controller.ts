/* eslint-disable prettier/prettier */

import { CorretoraService } from './corretora.service';
import { CriarCorretoraDTO } from './dto/criarCorretoraDTO';
import { atualizarCorretoraDTO } from './dto/atualizarCorretoraDTO';
import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseInterceptors } from '@nestjs/common';
//import { CacheInterceptor } from '@nestjs/cache-manager';
import { CacheInterceptor } from '@nestjs/cache-manager'
@Controller('/corretora')
export class CorretoraController {
  constructor(private readonly corretoraService: CorretoraService) {}
  @UseInterceptors(CacheInterceptor)
  @Post()
  async criarCorretora(@Session() session: Record<string, any>, @Body() dados: CriarCorretoraDTO){
    const corretoraC = await this.corretoraService.criaCorretora(dados)
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Message: "Corretora Estabelecida",
      Corretora: corretoraC
    }
  }
  @UseInterceptors(CacheInterceptor)
  @Get()
  async listarAsCorretoras(@Session() session: Record<string, any>){
    const corretorasAll = await this.corretoraService.listarCorretoras()
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Corretoras: corretorasAll
    }
  }
  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  async listarUmaCorretora(@Param('id') id: string, @Session() session: Record<string, any>){
    const corretoraOne = await this.corretoraService.listarUmaCorretora(id)
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Corretora: corretoraOne
    }
  }
  @UseInterceptors(CacheInterceptor)
  @Patch('/:id')
  async atualizarCorretora(@Session() session: Record<string, any>, @Param('id') id: string, @Body() dados: atualizarCorretoraDTO){
    const corretoraPatch = await this.corretoraService.atualizarCorretora(id, dados)
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Message: `Corretora: ${id} foi atualiza`,
      Corretora: corretoraPatch
    }
  }
  @Delete('/:id')
  async deletarCorretora(@Session() session: Record<string, any>, @Param('id') id: string){
    const del = await this.corretoraService.deletarCorretora(id)
    session.visits = session.visits ? session.visits +1 : 1
    return del
  }
}
