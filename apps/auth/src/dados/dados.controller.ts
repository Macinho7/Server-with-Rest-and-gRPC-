/* eslint-disable @typescript-eslint/no-unused-vars *//* eslint-disable prettier/prettier */
//import { Controller } from '@nestjs/common';
import { Controller } from '@nestjs/common'
import { DadosService } from './dados.service';
import { Observable } from 'rxjs';
import { GrpcMethod } from '@nestjs/microservices';
import { Comprador, Compradores, CompradosServiceController, CreateOneCompraDTO, FindOneCompraDTO, PaginacaoDto, UpdateCompraDTO } from '@app/lib';
@Controller()
export class DadosController implements CompradosServiceController  {
  constructor(private readonly dadosService: DadosService) {}
  @GrpcMethod('CompradosService', 'queryComprador')
  queryComprador(request: Observable<PaginacaoDto>): Observable<Compradores> {
    return this.dadosService.queryCompradores(request)
  }
  @GrpcMethod('CompradosService', 'createOneCompra')
  createOneCompra(CreateCompraDto: CreateOneCompraDTO): Comprador{
    return this.dadosService.create(CreateCompraDto)

  }
  @GrpcMethod('CompradosService', 'findAllCompra')
  findAllCompra() {
    return this.dadosService.findAll()
  }
  @GrpcMethod('CompradosService', 'findOneCompra')
  findOneCompra(request: FindOneCompraDTO) {
    return this.dadosService.findOne(request.id)
  }
  @GrpcMethod('CompradosService', 'updateOneCompra')
  updateOneCompra(request: UpdateCompraDTO) {
    return this.dadosService.updateOne(request.id, request)
  }
  @GrpcMethod('CompradosService', 'deleteOneCompra')
  deleteOneCompra(FindOneCompraDTO: FindOneCompraDTO) {
    return this.dadosService.remove(FindOneCompraDTO.id)
  }
}
