import * as mysql from 'mysql2';

import { ConfiguracaoConexaoMySQL } from '../interfaces';

export class ClienteMySQL {
    instanciaBancoDeDados: mysql.Connection | undefined = undefined;
    origemDados: mysql.ConnectionOptions;

    constructor(configuracao?: ConfiguracaoConexaoMySQL) {
        let enderecoHost = configuracao?.host ?? process.env.ENDERECO ?? 'localhost';
        let nomeBanco = configuracao?.banco ?? process.env.NOME_BASE_DADOS ?? '';
        let porta = configuracao?.porta;

        if (!configuracao?.host && configuracao?.caminho) {
            const [parteHost, parteBanco] = configuracao.caminho.split('/');
            const [hostSemPorta, partePorta] = parteHost.split(':');
            enderecoHost = hostSemPorta;
            nomeBanco = parteBanco ?? nomeBanco;
            if (partePorta && porta === undefined) {
                porta = Number(partePorta);
            }
        }

        this.origemDados = {
            host: enderecoHost,
            port: porta,
            user: configuracao?.usuario ?? process.env.USUARIO,
            password: configuracao?.senha ?? process.env.SENHA,
            database: nomeBanco
        };
    }

    public async abrir(): Promise<any> {
        return new Promise((resolve, reject) => {
            const conexao = mysql.createConnection(this.origemDados);
            conexao.connect((erro) => {
                if (erro) {
                    return reject('Erro ao conectar no MySQL: ' + JSON.stringify(erro));
                }

                this.instanciaBancoDeDados = conexao;
                resolve('Conectado ao banco de dados MySQL.');
            });
        });
    }

    public async executarComando(comando: string): Promise<any> {
        if (comando.startsWith('SELECT')) {
            return this.executarComandoSelecao(comando);
        }

        return new Promise((resolve, reject) => {
            this.instanciaBancoDeDados?.execute(
                comando,
                (erro: Error, linhas: any[], campos: any[]) => {
                    if (erro) {
                        reject(erro.message);
                    }
                    resolve({
                        linhas,
                        campos
                    });
                }
            );
        });
    }

    private executarComandoSelecao(comando: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instanciaBancoDeDados?.query(
                comando,
                (erro: Error, linhas: any[], campos: any[]) => {
                    if (erro) {
                        reject(erro.message);
                    }
                    resolve({
                        linhas,
                        campos
                    });
                }
            );
        });
    }
}
