/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { criarDadosDTO } from './criarDADOSDTO';

export class atualizaDadosCorretoraDTO extends PartialType(criarDadosDTO) {}
