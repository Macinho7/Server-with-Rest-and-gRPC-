/* eslint-disable prettier/prettier */
import { criarDadosDTO } from './dto/criarDADOSDTO';
import { HashearSenha } from '../recursos/pipehashearSenha';
import { atualizaDadosCorretoraDTO } from './dto/atualizarDADOSDTO';
import { AutenticarGuard } from '../autenticador/autenticar/autenticar.guard';
import { CacheInterceptor } from '@nestjs/cache-manager'
import { Body, Controller, Delete, Get, Param, Post, Put, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { DadosCorretoraService } from './dados-corretora.service';


@Controller('dados-corretora')
export class DadosCorretoraController {
  constructor(private readonly dadosCorretoraService: DadosCorretoraService) {}
  a = []
  @Post('/:id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(@Session() session: Record<string, any>, @Param('id') id: string, @Body() {senha, ...dados}: criarDadosDTO, @Body('senha', HashearSenha) senhaHash: string) {
    const dados2 = await this.dadosCorretoraService.criarDadosC(id, {
      senha: senhaHash,
      ...dados
    })
    
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Messagem: `Dados criados para a corretora ${id}`,
      Dados: dados2
    }
  }
  @UseInterceptors(CacheInterceptor)
  @Get()
  async listarDados(@Session() session: Record<string, any>){
    const dados = await this.dadosCorretoraService.listarDados()
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Dados: dados
    }
  }
  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  async listarUmDado(@Param('id') id: string, @Session() session: Record<string, any>){
    const dados = await this.dadosCorretoraService.listarUmDado(id)
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Dado: dados
    }
  }

  @UseGuards(AutenticarGuard)
  @Put('/:id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async atualizarDado(@Session() session: Record<string, any>, @Param('id') id: string, @Body() {senha, ...dados}: atualizaDadosCorretoraDTO, @Body('senha', HashearSenha) senhaHasheada: string){
    const dadosAtualizados = await this.dadosCorretoraService.atualizarDado(id, { senha: senhaHasheada, ...dados})
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Message: `Dados atualizados do id: ${id}`,
      Dados: dadosAtualizados
    }
  }

  @UseGuards(AutenticarGuard)
  @Delete('/:id')
  async deletarUmDado(@Param('id') id: string,@Session() session: Record<string, any>) {
    const del = await this.dadosCorretoraService.deletarDado(id)
    session.visits = session.visits ? session.visits +1 : 1
    return {
      Message: `Id dados: ${id} deletado`,
      Delete: del
    }
  }

}
