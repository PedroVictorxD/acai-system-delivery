export interface PedidoResponse {
    id: string;
    numeroPedido: number;
    origem: 'BALCAO' | 'LINK' | 'IFOOD';
    status: OrderStatus;
    tipo: 'BALCAO' | 'DELIVERY';
    subtotal: number;
    taxaEntrega: number;
    desconto: number;
    total: number;
    observacoes: string | null;
    criadoEm: string;
    atualizadoEm: string;
    cliente: ClienteResumo | null;
    itens: ItemPedidoResponse[];
}

export interface ClienteResumo {
    id: string;
    nome: string;
    telefone: string;
    endereco: string | null;
}

export interface ItemPedidoResponse {
    id: string;
    produtoNome: string;
    quantidade: number;
    precoUnitario: number;
    precoTotal: number;
    tamanhoMl: number | null;
    complementos: ItemComplementoResponse[];
}

export interface ItemComplementoResponse {
    complementoNome: string;
    quantidade: number;
    preco: number;
}

export type OrderStatus = 'PENDENTE' | 'PREPARANDO' | 'PRONTO' | 'ENTREGUE' | 'CANCELADO';

export interface CategoriaResponse {
    id: string;
    nome: string;
    descricao: string | null;
    imagemUrl: string | null;
    ordem: number;
    ativa: boolean;
    produtos: ProdutoResumido[];
}

export interface ProdutoResumido {
    id: string;
    nome: string;
    descricao: string | null;
    preco: number;
    imagemUrl: string | null;
    disponivel: boolean;
    tamanhoMl: number | null;
}

export interface ComplementoResponse {
    id: string;
    nome: string;
    precoAdicional: number;
    disponivel: boolean;
    maxPorPedido: number;
}

export interface ClienteResponse {
    id: string;
    nome: string;
    telefone: string;
    endereco: string | null;
    bairro: string | null;
    complementoEndereco: string | null;
    totalPedidos: number;
}

export interface CaixaResponse {
    id: string;
    usuarioNome: string;
    status: 'ABERTO' | 'FECHADO';
    saldoInicial: number;
    saldoFinal: number | null;
    totalEntradas: number;
    totalSaidas: number;
    saldoAtual: number;
    abertura: string;
    fechamento: string | null;
    movimentos: MovimentoResponse[];
}

export interface MovimentoResponse {
    id: string;
    tipo: 'ENTRADA' | 'SAIDA';
    valor: number;
    formaPagamento: string | null;
    descricao: string | null;
    criadoEm: string;
}
