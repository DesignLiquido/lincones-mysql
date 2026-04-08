export interface ConfiguracaoConexaoMySQL {
    host?: string;
    porta?: number;
    usuario?: string;
    senha?: string;
    banco?: string;
    /** Formato alternativo: "host:porta/banco" */
    caminho?: string;
}
