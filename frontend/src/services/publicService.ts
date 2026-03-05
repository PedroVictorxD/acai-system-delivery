import axios from 'axios';

const publicApi = axios.create({
    baseURL: 'http://localhost:8080/api/public',
    headers: { 'Content-Type': 'application/json' },
});

export interface CardapioData {
    categorias: {
        id: string;
        nome: string;
        descricao: string | null;
        imagemUrl: string | null;
        produtos: {
            id: string;
            nome: string;
            descricao: string | null;
            preco: number;
            imagemUrl: string | null;
            tamanhoMl: number | null;
        }[];
    }[];
    complementos: {
        id: string;
        nome: string;
        precoAdicional: number;
        maxPorPedido: number;
    }[];
}

export interface PedidoPublicoRequest {
    tipo: 'BALCAO' | 'DELIVERY';
    cliente?: {
        nome: string;
        telefone: string;
        endereco?: string;
        bairro?: string;
    };
    itens: {
        produtoId: string;
        quantidade: number;
        complementos?: { complementoId: string; quantidade: number }[];
    }[];
    observacoes?: string;
    taxaEntrega?: number;
}

export const publicService = {
    getCardapio: async (): Promise<CardapioData> => {
        const response = await publicApi.get<CardapioData>('/cardapio');
        return response.data;
    },

    criarPedido: async (data: PedidoPublicoRequest) => {
        const response = await publicApi.post('/pedidos', data);
        return response.data;
    },

    trackPedido: async (id: string) => {
        const response = await publicApi.get(`/pedidos/${id}/status`);
        return response.data;
    },
};
