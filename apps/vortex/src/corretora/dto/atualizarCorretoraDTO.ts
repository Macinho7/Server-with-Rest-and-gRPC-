/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CriarCorretoraDTO } from './criarCorretoraDTO';

export class atualizarCorretoraDTO extends PartialType(CriarCorretoraDTO) {}
