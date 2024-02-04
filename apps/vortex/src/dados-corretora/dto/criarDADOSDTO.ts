/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class criarDadosDTO {
    @IsUUID()
    id: string

    @IsNotEmpty({message: "esse ceo campo nao pode estar vazio"})
    ceo: string
    
    @Exclude()
    @IsNotEmpty({message: "esse senha campo nao pode estar vazio"})
    senha: string

    @IsNotEmpty({message: "esse email campo nao pode estar vazio"})
    email: string

}
