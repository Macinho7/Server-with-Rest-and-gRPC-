/* eslint-disable prettier/prettier */
import {  criarDadosDTO } from './dto/criarDADOSDTO';
import { DadosCorretoraEntity } from './dados-corretora.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CorretoraEntity } from '../corretora/corretora.entity';
import { atualizaDadosCorretoraDTO } from './dto/atualizarDADOSDTO';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DadosCorretoraService {
  constructor(
    @InjectRepository(DadosCorretoraEntity)
    private readonly dadosRepository: Repository<DadosCorretoraEntity>,
    @InjectRepository(CorretoraEntity)
    private readonly corretoraRepository: Repository<CorretoraEntity>
  ){}
   private async pegaCorretora(id: string){
    const cor = await this.corretoraRepository.findOneBy({id})
    if(cor === null){
      throw new NotFoundException("id passado nao achado")
    }
    return cor
  }
  private async verificaDadoCriado(id: string){
    const dadosId = await this.corretoraRepository.findOneBy({id})
    if(dadosId.dados && dadosId.dados.length > 0 ){
      throw new Error('Dados para essa corretora ja existe')
    }
    return dadosId
  }
  async criarDadosC(id: string, dados: criarDadosDTO) {
    const corretora = await this.pegaCorretora(id)
    const verificado = await this.verificaDadoCriado(id)
    if(!verificado){
      throw new BadRequestException('Dados para essa corretora ja existe')
    }
    if(corretora === null){
      throw new NotFoundException('corretora compra nao achada')
    }
    const dadosEntity = new DadosCorretoraEntity()

    dadosEntity.id = dados.id
    dadosEntity.ceo = dados.ceo
    dadosEntity.senha = dados.senha
    dadosEntity.email = dados.email
    dadosEntity.corretora = corretora

    return await this.dadosRepository.save(dadosEntity)
    
  }

  async listarDados(){
    const listados  = await this.dadosRepository.find()

    return listados
  }

  async listarUmDado(id: string){
    const listado = await this.dadosRepository.findOneBy({id})
    if(listado === null){
      throw new NotFoundException("id nao achado")
    }

    return listado

  }

  async atualizarDado(id: string, dados: atualizaDadosCorretoraDTO){
    const atualizado = await this.dadosRepository.findOneBy({id})
    if(atualizado === null){
      throw new NotFoundException("id nao achado")
    }

    Object.assign(atualizado, dados as DadosCorretoraEntity)

    return await this.dadosRepository.save(atualizado)
  }

  async deletarDado(id: string){
    return await this.dadosRepository.delete(id)
  }

  async buscarCeo(ceo: string){
    const Ceo = await this.dadosRepository.findOne({where: { ceo }})
    if(Ceo === null){
      throw new NotFoundException('Ceo nao achado')
    }
    return Ceo
  }
  async buscarEmailCorretor(email: string){
    const emailCorretor = await this.dadosRepository.findOne({where: {email}})
    if(emailCorretor === null){
      throw new NotFoundException('Ceo nao achado')
    }
    return emailCorretor
  }

}
