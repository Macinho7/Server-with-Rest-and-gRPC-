/* eslint-disable prettier/prettier */

//import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';
import { AUTH_SERVICE } from './constantes';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { COMPRADOS_SERVICE_NAME, CompradosServiceClient, CreateOneCompraDTO, PaginacaoDto, UpdateCompraDTO } from '@app/lib/types/auth';



@Injectable()
export class CompradoresService implements OnModuleInit {
    private compradorService: CompradosServiceClient
    constructor(
        @Inject(AUTH_SERVICE) private cliente: ClientGrpc

    ){}
    onModuleInit() {
        this.compradorService = this.cliente.getService<CompradosServiceClient>(COMPRADOS_SERVICE_NAME)
    }

    criarComprador(dados: CreateOneCompraDTO){
        return this.compradorService.createOneCompra(dados)
    }
    listarCompradores(){
        return this.compradorService.findAllCompra({})
    }
  
    listarComprador(id: string){
        return this.compradorService.findOneCompra({id})
    }

    atualizarComprador(id: string, dados: UpdateCompraDTO){
        return this.compradorService.updateOneCompra({id, ...dados})
    }

    deletarComprador(id: string){
        return this.compradorService.deleteOneCompra({id})
    }

    Compradores(){
        const Compradores$ = new ReplaySubject<PaginacaoDto>()

        Compradores$.next({ page: 0, skip: 200})
        Compradores$.next({ page: 1, skip: 200})
        Compradores$.next({ page: 2, skip: 200})
        Compradores$.next({ page: 3, skip: 200})

        Compradores$.complete();

        let parcialNumber = 1;

        this.compradorService.queryComprador(Compradores$).subscribe((empresas) => {
            console.log('Chunk', parcialNumber, empresas)
            parcialNumber += 1
        })
    }
}
