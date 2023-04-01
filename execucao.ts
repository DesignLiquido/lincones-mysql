import * as leituraLinhas from 'readline';

import { LinconesMySQL } from "./fontes/lincones-mysql";

const lincones = new LinconesMySQL();
lincones.clienteMySQL.abrir();

const interfaceLeitura = leituraLinhas.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\nlincones> ',
});

interfaceLeitura.prompt();
interfaceLeitura.on('line', (linha: string) => {
    lincones.executar(linha).then(resultado => {
        if (resultado.linhasRetornadas.length > 0) {
            console.table(resultado.linhasRetornadas);
        }
        
        if(resultado.mensagemExecucao){
            console.log(resultado.mensagemExecucao);
        }

        if (resultado.ultimoId) {
            console.log(`ID retornado pela operação: ${resultado.ultimoId}`);
        }

        return Promise.resolve();
    }).then(() => {
        interfaceLeitura.prompt();
    }).catch((erro) => {
        console.error(erro);
    });
});
