import * as mysql from 'mysql2';

export class ClienteMySQL {
    instanciaBancoDeDados: mysql.Connection;
    origemDados: any;

    constructor() {
        this.origemDados = {
            host     : process.env.ENDERECO,
            user     : process.env.USUARIO,
            password : process.env.SENHA,
            database : process.env.NOME_BASE_DADOS
        }
    }

    public async abrir(): Promise<any> {
        return new Promise((resolve, reject) => {
            const conexao = mysql.createConnection(this.origemDados);
            conexao.connect((erro) => {
                if(erro){
                    return reject('Erro ao conectar no MySQL: ' + erro.stack);
                }
                
                this.instanciaBancoDeDados = conexao;
                resolve('Conectado ao banco de dados MySQL.')
            });
        })
    }
  
    public async executarComando(comando: string): Promise<any> {
        if (comando.startsWith('SELECT')) {
            return this.executarComandoSelecao(comando);
        }

        return new Promise((resolve, reject) => {
            this.instanciaBancoDeDados.execute(comando, (erro: Error, linhas: any[], campos: any[]) => {
                if (erro) {
                    reject(erro.message);
                }
                resolve ({
                    linhas,
                    campos
                })
            });
        })
    }

    private executarComandoSelecao(comando: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instanciaBancoDeDados.query(comando, (erro: Error, linhas: any[], campos: any[]) => {
                if (erro) {
                    reject(erro.message);
                }
                resolve ({
                    linhas,
                    campos
                })
            });
        })
    }
}
