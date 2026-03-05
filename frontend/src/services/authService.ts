import api from './api';

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface AuthResponse {
    token: string;
    nome: string;
    email: string;
    role: string;
}

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },
};
