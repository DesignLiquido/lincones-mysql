import { DefinicaoPropriedade } from '@designliquido/delprops';

/**
 * Propriedades de configuração para uma fonte de dados MySQL
 * (`liquido.dados.<nome>.*`).
 */
const dados: DefinicaoPropriedade[] = [
    {
        nome: 'tecnologia',
        tipo: 'texto',
        detalhe: 'Tecnologia de banco de dados.',
        valoresPermitidos: ['mysql'],
    },
    {
        nome: 'host',
        tipo: 'texto',
        detalhe: 'Endereço do servidor MySQL.',
    },
    {
        nome: 'porta',
        tipo: 'numero',
        detalhe: 'Porta do servidor MySQL (padrão: 3306).',
    },
    {
        nome: 'usuario',
        tipo: 'texto',
        detalhe: 'Nome de usuário para conexão.',
    },
    {
        nome: 'senha',
        tipo: 'texto',
        detalhe: 'Senha para conexão.',
    },
    {
        nome: 'banco',
        tipo: 'texto',
        detalhe: 'Nome do banco de dados.',
    },
];

export default dados;
