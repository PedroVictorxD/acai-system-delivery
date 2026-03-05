import api from './api';
import type { CaixaResponse } from '../types';

export const caixaService = {
    getCaixaAberto: async (): Promise<CaixaResponse> => {
        const response = await api.get<CaixaResponse>('/caixa/aberto');
        return response.data;
    },

    abrirCaixa: async (valorInicial: number): Promise<CaixaResponse> => {
        const response = await api.post<CaixaResponse>('/caixa/abrir', { valorInicial });
        return response.data;
    },

    fecharCaixa: async (id: string): Promise<CaixaResponse> => {
        const response = await api.patch<CaixaResponse>(`/caixa/${id}/fechar`);
        return response.data;
    },

    registrarMovimento: async (id: string, data: {
        tipo: 'ENTRADA' | 'SAIDA';
        valor: number;
        formaPagamento?: string;
        descricao?: string;
    }): Promise<CaixaResponse> => {
        const response = await api.post<CaixaResponse>(`/caixa/${id}/movimentos`, data);
        return response.data;
    },
};
