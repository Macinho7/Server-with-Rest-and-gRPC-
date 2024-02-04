/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ServicoPayload } from '../autenticador.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface corretorInterface extends Request {
  corretor: ServicoPayload
}
@Injectable()
export class AutenticarGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ){}
  async canActivate(
    contexto: ExecutionContext
  ): Promise<boolean> {
    const requisicao = contexto.switchToHttp().getRequest<corretorInterface>()
    const token = this.pegarToken(requisicao)
    if(!token){
      throw new UnauthorizedException('Voce nao pode realizar essa acao sem um Token')
    }
    try {
      const payload: ServicoPayload = await this.jwtService.verifyAsync(token)
      requisicao.corretor = payload
    } catch(error) {
      throw new BadRequestException('Token invalido', error)
    }

    return true
  }

  private pegarToken(request: Request): string | undefined {
    const [Tipo, Token] = request.headers.authorization?.split(' ') ?? []
    return Tipo === 'Bearer' ? Token : undefined
  }
}
