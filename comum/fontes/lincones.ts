import { AvaliadorSintatico } from "./avaliador-sintatico";
import { Lexador } from "./lexador";
import { Tradutor } from "./tradutor";

export class Lincones {
    lexador: Lexador;
    avaliadorSintatico: AvaliadorSintatico;
    tradutor: Tradutor;

    constructor() {
        this.lexador = new Lexador();
        this.avaliadorSintatico = new AvaliadorSintatico();
        this.tradutor = new Tradutor();
    }

    executar(comando: string) {
        const resultadoLexador = this.lexador.mapear([comando]);
        const resultadoAvaliacaoSintatica = this.avaliadorSintatico.analisar(resultadoLexador);
        const resultadoTraducao = this.tradutor.traduzir(resultadoAvaliacaoSintatica.comandos);
        return resultadoTraducao;
    }
}
