/* eslint-disable prettier/prettier */
export class ListaCorretorasDTO {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly fundacao: string,
    readonly especializacao: string,
    readonly local: string,
    readonly dados: any
  ) {}
}
