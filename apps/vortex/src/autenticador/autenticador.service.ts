/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import { DadosCorretoraService } from '../dados-corretora/dados-corretora.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface ServicoPayload {
  sub: string
  nomeCeo: string
}
@Injectable()
export class AutenticadorService {
  constructor(
    private dadosCorretoraService: DadosCorretoraService,
    private jwtService: JwtService
  ){}

  async loginAcesso(ceo, senha) {
    const corretor = await this.dadosCorretoraService.buscarCeo(ceo)

    const ceoAutentica = await bcrypt.compare(senha, corretor.senha)

    if(!ceoAutentica){
      throw new BadRequestException(`Ceo: ${ceo} ou Senha: ${senha}`)
    }

    const Payload: ServicoPayload = {
      sub: corretor.id,
      nomeCeo: corretor.ceo
    }

    return {
      TokenPessoal: await this.jwtService.signAsync(Payload)
    }
  }
}
