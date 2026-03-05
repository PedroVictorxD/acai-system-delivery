import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ email, senha });
            navigate('/');
        } catch {
            setError('Email ou senha inválidos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-4">
            <div className="bg-surface-100 backdrop-blur-xl border border-surface-300 rounded-2xl p-8 w-full max-w-sm shadow-2xl">

                <div className="text-center mb-8">
                    <div className="text-5xl mb-3 drop-shadow-lg">🍇</div>
                    <h1 className="text-2xl font-bold text-text-primary tracking-tight">Açaí System</h1>
                    <p className="text-sm text-text-muted mt-1">Faça login para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {error && (
                        <div className="flex items-center gap-2 bg-danger-500/15 border border-danger-500/30 text-danger-400 px-4 py-3 rounded-lg text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@acai.com"
                                required
                                autoFocus
                                className="w-full bg-surface-100 border border-surface-300 rounded-xl py-3 pl-10 pr-4 text-text-primary placeholder-text-muted outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:bg-surface-200"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="senha" className="text-sm font-medium text-text-secondary">Senha</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                id="senha"
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-surface-100 border border-surface-300 rounded-xl py-3 pl-10 pr-4 text-text-primary placeholder-text-muted outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:bg-surface-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold cursor-pointer transition-all hover:from-primary-400 hover:to-primary-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
                    >
                        <LogIn size={18} />
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
