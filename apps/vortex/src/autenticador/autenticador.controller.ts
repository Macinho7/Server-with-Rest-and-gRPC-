/* eslint-disable prettier/prettier */
//import { Controller, Post, Body  } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { AutenticadorService } from './autenticador.service';
import { autenticaDTO } from './dto/autentica';

@Controller('autenticado')
export class AutenticadorController {
  constructor(private readonly autenticadorService: AutenticadorService) {}


  @Post('/acesso')
  login(@Body() {ceo, senha}: autenticaDTO) {
    return this.autenticadorService.loginAcesso( ceo, senha)
  }
  

}
