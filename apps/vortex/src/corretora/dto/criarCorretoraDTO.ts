/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from 'class-validator';
import { NomeEhUnico } from '../../recursos/validar/nome-eh-unico';

/* eslint-disable prettier/prettier */
export class CriarCorretoraDTO {
    @IsUUID()
    id: string
    @NomeEhUnico({message: "Nome ja existente"})
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string

    @IsNotEmpty({ message: 'O fundacao não pode ser vazio' })
    fundacao:string

    @IsNotEmpty({ message: 'O especializacao não pode ser vazio' })
    especializacao: string

    @IsNotEmpty({ message: 'O local não pode ser vazio' })
    local: string

}
