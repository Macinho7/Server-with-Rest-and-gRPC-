/* eslint-disable prettier/prettier */
//import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CorretoraEntity } from './corretora.entity';
import { Repository } from 'typeorm';
import { CriarCorretoraDTO } from './dto/criarCorretoraDTO';
import { atualizarCorretoraDTO } from './dto/atualizarCorretoraDTO';
import { ListaCorretorasDTO } from './dto/listartCorretorasDTO';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CorretoraService {
  constructor(
    @InjectRepository(CorretoraEntity)
    private readonly corretoraRepository: Repository<CorretoraEntity>
  ){}

   async criaCorretora(dados: CriarCorretoraDTO){
    const corretora = new CorretoraEntity()

    Object.assign(corretora, dados as unknown as CorretoraEntity)

    return await this.corretoraRepository.save(corretora)
  }

   async listarCorretoras(){
    const corretorad =  await this.corretoraRepository.find()
    
    const corretorasFiltro = corretorad.map((filtro) =>  new ListaCorretorasDTO(filtro.id, filtro.nome, filtro.fundacao, filtro.especializacao, filtro.local, filtro.dados))

    return corretorasFiltro
  }

   async listarUmaCorretora(id: string){
    const corretoraUma = await this.corretoraRepository.findOneBy({id})
    if(corretoraUma === null){
      throw new NotFoundException(`Id: ${id} nao achado`)
    }

    return corretoraUma
  }

   async atualizarCorretora(id: string, dados: atualizarCorretoraDTO){
    const corrAchada = await this.corretoraRepository.findOneBy({id})
    if(corrAchada === null){
      throw new NotFoundException(`Id: ${id} nao achado`)
    }
    corrAchada.fundacao = dados.fundacao
    corrAchada.especializacao = dados.especializacao
    corrAchada.local = dados.local

    return await this.corretoraRepository.save(corrAchada)

  }

    async deletarCorretora(id: string){
    const del = await this.corretoraRepository.delete({id})
    if(del === null){
      throw new NotFoundException(`Id: ${id} nao achado`)
    }

    return del
    
  }

  async buscarNome(nome: string) {
    const nomeCorretor = await this.corretoraRepository.findOne({where: {nome}})

    if (nomeCorretor === null){
      throw new NotFoundException('O nome não foi encontrado.');
    }
    return nomeCorretor;
  }

}
