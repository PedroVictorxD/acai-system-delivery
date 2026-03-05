import api from './api';
import type { CategoriaResponse, ComplementoResponse } from '../types';

interface CategoriaRequest {
    nome: string;
    descricao?: string;
    imagemUrl?: string;
    ordem?: number;
}

interface ProdutoRequest {
    categoriaId: string;
    nome: string;
    descricao?: string;
    preco: number;
    imagemUrl?: string;
    tamanhoMl?: number;
}

interface ComplementoRequest {
    nome: string;
    precoAdicional: number;
    disponivel?: boolean;
    maxPorPedido?: number;
}

export const catalogoService = {
    // Categorias
    listarCategorias: async (): Promise<CategoriaResponse[]> => {
        const response = await api.get<CategoriaResponse[]>('/categorias');
        return response.data;
    },
    criarCategoria: async (data: CategoriaRequest): Promise<CategoriaResponse> => {
        const response = await api.post<CategoriaResponse>('/categorias', data);
        return response.data;
    },
    atualizarCategoria: async (id: string, data: CategoriaRequest): Promise<CategoriaResponse> => {
        const response = await api.put<CategoriaResponse>(`/categorias/${id}`, data);
        return response.data;
    },
    toggleCategoria: async (id: string): Promise<CategoriaResponse> => {
        const response = await api.patch<CategoriaResponse>(`/categorias/${id}/toggle`);
        return response.data;
    },

    // Produtos
    criarProduto: async (data: ProdutoRequest) => {
        const response = await api.post('/produtos', data);
        return response.data;
    },
    atualizarProduto: async (id: string, data: ProdutoRequest) => {
        const response = await api.put(`/produtos/${id}`, data);
        return response.data;
    },
    toggleProduto: async (id: string) => {
        const response = await api.patch(`/produtos/${id}/toggle`);
        return response.data;
    },

    // Complementos
    listarComplementos: async (): Promise<ComplementoResponse[]> => {
        const response = await api.get<ComplementoResponse[]>('/complementos');
        return response.data;
    },
    criarComplemento: async (data: ComplementoRequest): Promise<ComplementoResponse> => {
        const response = await api.post<ComplementoResponse>('/complementos', data);
        return response.data;
    },
    atualizarComplemento: async (id: string, data: ComplementoRequest): Promise<ComplementoResponse> => {
        const response = await api.put<ComplementoResponse>(`/complementos/${id}`, data);
        return response.data;
    },
    toggleComplemento: async (id: string): Promise<ComplementoResponse> => {
        const response = await api.patch<ComplementoResponse>(`/complementos/${id}/toggle`);
        return response.data;
    },
};
