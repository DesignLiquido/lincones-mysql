export class RetornoComando {
    linhasRetornadas: any[] = [];
    mensagemExecucao: string;

    constructor(resultadoExecucao: any) {
        if (!resultadoExecucao) {
            return;
        }

        if (resultadoExecucao?.linhas?.affectedRows) {
            const linhas = resultadoExecucao?.linhas?.affectedRows || 0;
            this.mensagemExecucao = `Ok (${linhas} ${linhas > 1 ? 'linhas afetadas' : 'linha afetada'})`;
            return;
        }

        if (Array.isArray(resultadoExecucao?.linhas)) {
            const linhas = resultadoExecucao.linhas?.length || 0
            this.linhasRetornadas = resultadoExecucao?.linhas;
            this.mensagemExecucao = `(${linhas} ${linhas > 1 ? 'linhas retornadas' : 'linha retornada'})`;
            return;
        }
    }
}