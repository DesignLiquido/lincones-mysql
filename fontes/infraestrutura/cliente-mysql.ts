// import * as caminho from 'node:path';

import * as mysql from 'mysql2';

export class ClienteMySQL {
    instanciaBancoDeDados: mysql.Connection;
    readonly caminhoRaiz: string;
    origemDados: any;

    constructor(origemDados: any = null) {
        this.caminhoRaiz = process.cwd();

        if(origemDados){
            this.origemDados = origemDados;
        } else {
            //Fins de testes @Samuel
            this.origemDados = {
                host     : 'localhost',
                user     : 'root',
                password : '123456',
                database : 'world',
            }
        }
        // if (origemDados !== ':memory:' && origemDados !== null) {
        //     this.origemDados = caminho.join(this.caminhoRaiz, origemDados);
        // } else {
        //     this.origemDados = ':memory:';
        // }
    }

    public async abrir() {
        const database = await mysql.createConnection(this.origemDados);
        database.connect((erro) => {
            if(erro){
                console.error('Erro ao conectar no MySQL: ' + erro.stack);
                return;
            }
            
            this.instanciaBancoDeDados = database;
            console.log('Conectado ao banco de dados MySQL.');
        });
    }

    public async executarComando(comando: string): Promise<any> {
        if (comando.startsWith('SELECT')) {
            return await this.executarComandoSelecao(comando);
        }

        return await this.instanciaBancoDeDados.execute(comando, (erro: Error) => {
            if (erro) {
                console.log(erro.message);
            }
        });
    }

    private async executarComandoSelecao(comando: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.instanciaBancoDeDados.query(comando, (erro, resultado) => {
                 if (erro) {
                    return reject('Erro ao obter os dados');
                };
                resolve(resultado)
            })
        })
    }
}
