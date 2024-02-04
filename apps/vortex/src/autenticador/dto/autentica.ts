/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class autenticaDTO {
  @IsNotEmpty({ message: 'Campo Ceo nao pode estar vazio' })
  ceo: string;

  @IsNotEmpty({ message: 'campo senha nao pode estar vazio' })
  senha: string;
}
