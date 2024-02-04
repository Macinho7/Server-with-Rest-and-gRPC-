/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CorretoraService } from '../../corretora/corretora.service';
@ValidatorConstraint({ name: 'NomeEhUnicoValidator', async: true })
@Injectable()
export class NomeEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private corretoraRepository: CorretoraService) {}

  async validate(value: any): Promise<boolean> {
    const usuarioComNomeExiste =
      await this.corretoraRepository.buscarNome(value);
    return !usuarioComNomeExiste;
  }
}

export const NomeEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: NomeEhUnicoValidator,
    });
  };
};
