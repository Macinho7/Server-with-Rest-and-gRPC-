/* eslint-disable prettier/prettier */
import { Comprador, Compradores, CreateOneCompraDTO, PaginacaoDto, UpdateCompraDTO } from '@app/lib/types/auth';
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

//import {Compra, Compradores,CreateCompraDto,PaginacaoDto,UpdateCompraDto} from '@app/common'
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class DadosService implements OnModuleInit {
 private readonly compradores: Comprador[] = [];

  onModuleInit() {
    for(let i = 0; i <= 10; i++){
      this.create({pessoa: randomUUID(), idade: randomUUID(), empresa: randomUUID(), senha: randomUUID(),  cidade: randomUUID(), dadosCompra: {}})
    }
  }
  create(CreateCompraDto: CreateOneCompraDTO): Comprador {
    const comprador: Comprador = {
      ...CreateCompraDto,
      id: randomUUID(),
    }
    this.compradores.push(comprador)
    return comprador
  }
  findAll(): Compradores {
    return {compradores: this.compradores}
  }

  findOne(id: string): any{
    return this.compradores.find((comprador) => comprador.id === id)
  }

  updateOne(id: string, dados: UpdateCompraDTO) {
    const compradorId = this.compradores.findIndex((comp) => comp.id === id)
    if(compradorId !== -1){
      this.compradores[compradorId] = {
        ...this.compradores[compradorId],
        ...dados
      }
      return this.compradores[compradorId]
    }
    throw new NotFoundException(`Comprador do id: ${id}`)
  }

  remove(id: string){
    const deleteId = this.compradores.findIndex((del) => del.id === id)
    if(deleteId !== -1){
      return this.compradores.splice(deleteId, 1)[0]
      
    }
    throw new NotFoundException(`Comprador do id: ${id}`)
  }

  queryCompradores(paginacaoDTO: Observable<PaginacaoDto>): Observable<Compradores> {
    const subject = new Subject<Compradores>()

    const onNext = (paginacaoDTO: PaginacaoDto) => {
      const start = paginacaoDTO.page * paginacaoDTO.skip
      subject.next({
        compradores: this.compradores.splice(start, start + paginacaoDTO.skip),
      })
    };
    const onComplete = () => subject.complete()
    paginacaoDTO.subscribe({
      next: onNext,
      complete: onComplete
    })

    return subject.asObservable();
  }

}