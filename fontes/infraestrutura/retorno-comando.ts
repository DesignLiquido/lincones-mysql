import { RetornoComandoInterface } from "../comum/fontes/interfaces/retorno-comando-interface";

export class RetornoComando implements RetornoComandoInterface {
    linhasRetornadas: any[] = [];
    mensagemExecucao: string;
    linhasAfetadas: number;
    ultimoId: any;
    comandoExecutado: string;

    constructor(resultadoExecucao: any) {
        if (!resultadoExecucao) {
            return;
        }

        const linhas = resultadoExecucao.linhas;

        if (linhas && linhas.affectedRows) {
            const linhasAfetadas = resultadoExecucao?.linhas?.affectedRows || 0;
            this.linhasAfetadas = linhasAfetadas;
            this.mensagemExecucao = `Ok (${linhasAfetadas} ${linhasAfetadas > 1 ? 'linhas afetadas' : 'linha afetada'})`;
            return;
        }

        if (Array.isArray(linhas)) {
            const linhasAfetadas = linhas.length || 0;
            this.linhasRetornadas = linhas;
            this.mensagemExecucao = `(${linhasAfetadas} ${linhasAfetadas > 1 ? 'linhas retornadas' : 'linha retornada'})`;
        }
    }   
}