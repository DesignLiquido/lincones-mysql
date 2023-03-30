import * as leituraLinhas from 'readline';

import { Lincones } from "./fontes/lincones";

const lincones = new Lincones();

const interfaceLeitura = leituraLinhas.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\nlincones> ',
});

interfaceLeitura.prompt();
interfaceLeitura.on('line', (linha: string) => {
    const resultado = lincones.executar(linha);
    console.log(resultado)

    interfaceLeitura.prompt();
});
