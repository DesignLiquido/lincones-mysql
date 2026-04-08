import { Coluna, TradutorSqlAnsi } from '../comum/fontes';
import {
    Comando,
    Criar,
} from '../comum/fontes/comandos';
import { Simbolo } from '../comum/fontes/lexador/simbolo';

import tiposDeSimbolos from '../comum/fontes/tipos-de-simbolos';

export class Tradutor extends TradutorSqlAnsi {
    traduzirOperador(operador: string) {
        switch (operador) {
            case tiposDeSimbolos.IGUAL:
                return '=';
            case tiposDeSimbolos.VERDADEIRO:
                return true;
            case tiposDeSimbolos.FALSO:
                return false;
        }
    }

    traduzirColuna(coluna: Coluna) {
        let traduzir = '';

        if (tiposDeSimbolos.INTEIRO === coluna.tipo) {
            traduzir += `INTEGER `;
        } else if (tiposDeSimbolos.TEXTO === coluna.tipo) {
            const simbolo = coluna.tamanho as Simbolo | undefined;
            const tamanho = Number(simbolo?.literal) || 255;
            traduzir += `VARCHAR(${tamanho}) `;
        } else if (tiposDeSimbolos.LOGICO === coluna.tipo)
            traduzir += 'BOOLEAN ';

        if (coluna.nulo) traduzir += 'NULL';
        else traduzir += 'NOT NULL';

        if (coluna.autoIncremento) traduzir += ' AUTO_INCREMENT';
        if (coluna.chavePrimaria) traduzir += ' PRIMARY KEY';

        return traduzir;
    }

    traduzirComandoCriar(comandoCriar: Criar) {
        let resultado = `CREATE TABLE ${comandoCriar.nomeEntidade} (`;

        for (const coluna of comandoCriar.colunas) {
            resultado += `${coluna.nomeColuna} ${this.traduzirColuna(
                coluna
            )}, `;
        }

        resultado = resultado.slice(0, -2);
        resultado += ')';

        return resultado;
    }

    traduzir(comandos: Comando[]) {
        let resultado = '';

        for (const comando of comandos.filter((c) => c)) {
            resultado += `${this.dicionarioComandos[comando.constructor.name](
                comando
            )} \n`;
        }

        return resultado;
    }
}
