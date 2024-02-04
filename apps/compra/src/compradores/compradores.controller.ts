/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompradoresService } from 'apps/compra/src/compradores/compradores.service';
import { HashearSenha } from '../recursos/pipeHashearSenha';
import { CreateOneCompraDTO, UpdateCompraDTO } from '@app/lib/types/auth';

@Controller('/compradores')
export class CompradoresController {
  constructor(private readonly compradoresService: CompradoresService) {}
  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  criarCompradores(@Body() {senha, ...dados}: CreateOneCompraDTO, @Body('senha', HashearSenha) senhaHash: string){
    return this.compradoresService.criarComprador({senha: senhaHash, ...dados})

  }

  @Get()
  listarOsCOmpradores (){
      return this.compradoresService.listarCompradores()
  }
  
  @Get('/:id')
  listarOComprador(@Param('id') id: string){
    return this.compradoresService.listarComprador(id)
  }

  @Patch('/:id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  atualizarOComprador(@Param('id') id: string, @Body() {senha, ...dados}: UpdateCompraDTO, @Body('senha', HashearSenha) senhaHash: string){
    return this.compradoresService.atualizarComprador(id, {senha: senhaHash, ...dados})
  }
  
  @Delete('/:id')
  deletarOComprador(@Param('id') id: string){
    return this.compradoresService.deletarComprador(id)
  }

  @Post('compradores')
  compradoresStream(){
    return this.compradoresService.Compradores()
  }
}
