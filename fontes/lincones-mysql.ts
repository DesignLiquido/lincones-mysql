import { Tradutor } from "../comum/fontes/tradutor";
import { AvaliadorSintatico } from "../comum/fontes/avaliador-sintatico";
import { Lexador } from "./lexador";
import { ClienteMySQL } from "./infraestrutura/cliente-mysql";
import { RetornoComando } from "./infraestrutura";

import * as dotenv from 'dotenv'
dotenv.config()

export class LinconesMySQL {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;
    tradutor: Tradutor;
    clienteMySQL: ClienteMySQL;

    constructor() {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.tradutor = new Tradutor();
        this.clienteMySQL = new ClienteMySQL();
    }

    async executar(comando: string): Promise<RetornoComando> {
        const resultadoLexador = this.lexador.mapear([comando]);
        const resultadoAvaliacaoSintatica = this.avaliadorSintatico.analisar(resultadoLexador);
        const resultadoTraducao = this.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);

        if (resultadoAvaliacaoSintatica.comandos.length <= 0) {
            return new RetornoComando(null);
        }

        const resultadoExecucao = await this.clienteMySQL.executarComando(resultadoTraducao);
        const retorno = new RetornoComando(resultadoExecucao);

        return retorno;
    }
}