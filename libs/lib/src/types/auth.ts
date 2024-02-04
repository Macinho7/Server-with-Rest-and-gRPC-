/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface PaginacaoDto {
  page: number;
  skip: number;
}

export interface UpdateCompraDTO {
  id: string;
  pessoa: string;
  idade: string;
  empresa: string;
  cidade: string;
  senha: string;
  dadosCompra: DadosCompra | undefined;
}

export interface FindOneCompraDTO {
  id: string;
}

export interface Empty {
}

export interface Compradores {
  compradores: Comprador[];
}

export interface CreateOneCompraDTO {
  pessoa: string;
  idade: string;
  empresa: string;
  cidade: string;
  senha: string;
  dadosCompra: DadosCompra | undefined;
}

export interface Comprador {
  id: string;
  pessoa: string;
  idade: string;
  empresa: string;
  cidade: string;
  senha: string;
  dadosCompra: DadosCompra | undefined;
}

export interface DadosCompra {
  valor?: string | undefined;
  moeda?: string | undefined;
  bancoUsado?: string | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface CompradosServiceClient {
  createOneCompra(request: CreateOneCompraDTO): Observable<Comprador>;

  findAllCompra(request: Empty): Observable<Compradores>;

  findOneCompra(request: FindOneCompraDTO): Observable<Comprador>;

  updateOneCompra(request: UpdateCompraDTO): Observable<Comprador>;

  deleteOneCompra(request: FindOneCompraDTO): Observable<Comprador>;

  queryComprador(request: Observable<PaginacaoDto>): Observable<Compradores>;
}

export interface CompradosServiceController {
  createOneCompra(request: CreateOneCompraDTO): Promise<Comprador> | Observable<Comprador> | Comprador;

  findAllCompra(request: Empty): Promise<Compradores> | Observable<Compradores> | Compradores;

  findOneCompra(request: FindOneCompraDTO): Promise<Comprador> | Observable<Comprador> | Comprador;

  updateOneCompra(request: UpdateCompraDTO): Promise<Comprador> | Observable<Comprador> | Comprador;

  deleteOneCompra(request: FindOneCompraDTO): Promise<Comprador> | Observable<Comprador> | Comprador;

  queryComprador(request: Observable<PaginacaoDto>): Observable<Compradores>;
}

export function CompradosServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createOneCompra",
      "findAllCompra",
      "findOneCompra",
      "updateOneCompra",
      "deleteOneCompra",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CompradosService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["queryComprador"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CompradosService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMPRADOS_SERVICE_NAME = "CompradosService";
