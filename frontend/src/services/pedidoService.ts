import api from './api';
import type { PedidoResponse, OrderStatus } from '../types';

export const pedidoService = {
    listarTodos: async (): Promise<PedidoResponse[]> => {
        const response = await api.get<PedidoResponse[]>('/pedidos');
        return response.data;
    },

    listarAtivos: async (): Promise<PedidoResponse[]> => {
        const response = await api.get<PedidoResponse[]>('/pedidos/ativos');
        return response.data;
    },

    listarPorStatus: async (status: OrderStatus): Promise<PedidoResponse[]> => {
        const response = await api.get<PedidoResponse[]>(`/pedidos/status/${status}`);
        return response.data;
    },

    buscarPorId: async (id: string): Promise<PedidoResponse> => {
        const response = await api.get<PedidoResponse>(`/pedidos/${id}`);
        return response.data;
    },

    atualizarStatus: async (id: string, status: OrderStatus): Promise<PedidoResponse> => {
        const response = await api.patch<PedidoResponse>(`/pedidos/${id}/status`, { status });
        return response.data;
    },
};
