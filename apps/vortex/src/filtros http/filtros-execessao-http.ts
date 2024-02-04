/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class FiltrarRespostasHttp implements ExceptionFilter {
    constructor(
        private adapterHOST: HttpAdapterHost,
        private loggerLOG: ConsoleLogger
    ){}
    catch(excessao: any, host: ArgumentsHost) {
        this.loggerLOG.error(excessao)
        console.error(excessao)
        const { httpAdapter } = this.adapterHOST

        const contexto = host.switchToHttp()
        const resposta = contexto.getResponse()
        const requisicao = contexto.getRequest()

        const { status, body} = 
            excessao instanceof HttpException ? {
                status: excessao.getStatus(),
                body: excessao.getResponse()
            }  : {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    tempo: new Date().toISOString(),
                    path: httpAdapter.getRequestUrl(requisicao),
                    metodo: httpAdapter.getRequestMethod(requisicao)
                }
            }
        httpAdapter.reply(resposta, body, status)       
    }     
}