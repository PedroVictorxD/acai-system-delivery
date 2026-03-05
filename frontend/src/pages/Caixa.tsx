import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { caixaService } from '../services/caixaService';
import type { CaixaResponse } from '../types';
import {
    Wallet,
    ArrowUpCircle,
    ArrowDownCircle,
    DoorOpen,
    DoorClosed,
    Plus,
    TrendingUp,
    TrendingDown,
    Clock,
} from 'lucide-react';

export function CaixaPage() {
    const [caixa, setCaixa] = useState<CaixaResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [caixaAberto, setCaixaAberto] = useState(false);
    const [valorInicial, setValorInicial] = useState('');
    const [showMovimento, setShowMovimento] = useState(false);
    const [movTipo, setMovTipo] = useState<'ENTRADA' | 'SAIDA'>('ENTRADA');
    const [movValor, setMovValor] = useState('');
    const [movDescricao, setMovDescricao] = useState('');

    const loadCaixa = async () => {
        setLoading(true);
        try {
            const data = await caixaService.getCaixaAberto();
            setCaixa(data);
            setCaixaAberto(true);
        } catch {
            setCaixa(null);
            setCaixaAberto(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadCaixa(); }, []);

    const handleAbrir = async () => {
        try {
            const data = await caixaService.abrirCaixa(parseFloat(valorInicial) || 0);
            setCaixa(data);
            setCaixaAberto(true);
            setValorInicial('');
        } catch { alert('Erro ao abrir caixa'); }
    };

    const handleFechar = async () => {
        if (!caixa || !confirm('Confirma fechamento do caixa?')) return;
        try {
            const data = await caixaService.fecharCaixa(caixa.id);
            setCaixa(data);
            setCaixaAberto(false);
        } catch { alert('Erro ao fechar caixa'); }
    };

    const handleMovimento = async () => {
        if (!caixa) return;
        try {
            const data = await caixaService.registrarMovimento(caixa.id, {
                tipo: movTipo,
                valor: parseFloat(movValor),
                descricao: movDescricao,
            });
            setCaixa(data);
            setShowMovimento(false);
            setMovValor('');
            setMovDescricao('');
        } catch { alert('Erro ao registrar movimento'); }
    };

    const formatTime = (dateStr: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <>
                <Header title="Caixa" />
                <div className="p-6 text-text-muted">Carregando...</div>
            </>
        );
    }

    return (
        <>
            <Header title="Caixa" />
            <div className="p-6 space-y-6">
                {!caixaAberto ? (
                    <div className="bg-surface-100 border border-surface-300 rounded-2xl p-8 max-w-md mx-auto text-center space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto">
                            <Wallet size={28} className="text-primary-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-primary">Nenhum caixa aberto</h3>
                            <p className="text-sm text-text-muted mt-1">Informe o valor inicial para abrir o caixa</p>
                        </div>
                        <div className="flex gap-3 items-center justify-center">
                            <input
                                type="number"
                                step="0.01"
                                value={valorInicial}
                                onChange={(e) => setValorInicial(e.target.value)}
                                placeholder="R$ 0,00"
                                className="w-40 bg-surface-200 border border-surface-300 rounded-xl py-3 px-4 text-text-primary placeholder-text-muted outline-none focus:border-primary-500"
                            />
                            <button
                                onClick={handleAbrir}
                                className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 px-6 font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/20"
                            >
                                <DoorOpen size={18} />
                                Abrir Caixa
                            </button>
                        </div>
                    </div>
                ) : caixa && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="bg-surface-100 border border-surface-300 rounded-2xl p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                    <Wallet size={22} className="text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-muted">Saldo Inicial</p>
                                    <p className="text-xl font-bold text-text-primary">R$ {caixa.saldoInicial.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="bg-surface-100 border border-surface-300 rounded-2xl p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-success-500/20 flex items-center justify-center">
                                    <TrendingUp size={22} className="text-success-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-muted">Entradas</p>
                                    <p className="text-xl font-bold text-success-400">R$ {caixa.totalEntradas.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="bg-surface-100 border border-surface-300 rounded-2xl p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-danger-500/20 flex items-center justify-center">
                                    <TrendingDown size={22} className="text-danger-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-muted">Saídas</p>
                                    <p className="text-xl font-bold text-danger-400">R$ {caixa.totalSaidas.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="bg-surface-100 border border-surface-300 rounded-2xl p-5 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                                    <Wallet size={22} className="text-accent-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-muted">Saldo Atual</p>
                                    <p className="text-xl font-bold text-text-primary">R$ {caixa.saldoAtual.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setMovTipo('ENTRADA'); setShowMovimento(true); }}
                                className="flex items-center gap-2 bg-success-500/15 border border-success-500/30 text-success-400 rounded-xl py-2.5 px-4 font-medium transition-all hover:bg-success-500/25"
                            >
                                <ArrowUpCircle size={18} />
                                Entrada
                            </button>
                            <button
                                onClick={() => { setMovTipo('SAIDA'); setShowMovimento(true); }}
                                className="flex items-center gap-2 bg-danger-500/15 border border-danger-500/30 text-danger-400 rounded-xl py-2.5 px-4 font-medium transition-all hover:bg-danger-500/25"
                            >
                                <ArrowDownCircle size={18} />
                                Saída
                            </button>
                            <button
                                onClick={handleFechar}
                                className="flex items-center gap-2 bg-surface-100 border border-surface-300 text-text-secondary rounded-xl py-2.5 px-4 font-medium transition-all hover:bg-surface-200 ml-auto"
                            >
                                <DoorClosed size={18} />
                                Fechar Caixa
                            </button>
                        </div>

                        {showMovimento && (
                            <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6 max-w-md space-y-4">
                                <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                                    <Plus size={18} />
                                    Nova {movTipo === 'ENTRADA' ? 'Entrada' : 'Saída'}
                                </h3>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={movValor}
                                    onChange={(e) => setMovValor(e.target.value)}
                                    placeholder="Valor (R$)"
                                    className="w-full bg-surface-200 border border-surface-300 rounded-xl py-3 px-4 text-text-primary placeholder-text-muted outline-none focus:border-primary-500"
                                />
                                <input
                                    type="text"
                                    value={movDescricao}
                                    onChange={(e) => setMovDescricao(e.target.value)}
                                    placeholder="Descrição (opcional)"
                                    className="w-full bg-surface-200 border border-surface-300 rounded-xl py-3 px-4 text-text-primary placeholder-text-muted outline-none focus:border-primary-500"
                                />
                                <div className="flex gap-2">
                                    <button onClick={handleMovimento} className="flex-1 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold transition-all hover:shadow-lg">
                                        Confirmar
                                    </button>
                                    <button onClick={() => setShowMovimento(false)} className="px-4 py-3 rounded-xl border border-surface-300 text-text-muted hover:bg-surface-200 transition-all">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-text-primary mb-4">Movimentos</h3>
                            {caixa.movimentos.length === 0 ? (
                                <p className="text-text-muted text-sm">Nenhum movimento registrado</p>
                            ) : (
                                <div className="space-y-2">
                                    {caixa.movimentos.map((mov) => (
                                        <div key={mov.id} className="flex items-center justify-between p-3 bg-surface-200 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                {mov.tipo === 'ENTRADA' ? (
                                                    <ArrowUpCircle size={18} className="text-success-400" />
                                                ) : (
                                                    <ArrowDownCircle size={18} className="text-danger-400" />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-text-primary">{mov.descricao || mov.tipo}</p>
                                                    <p className="text-xs text-text-muted flex items-center gap-1">
                                                        <Clock size={10} />
                                                        {formatTime(mov.criadoEm)}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`font-semibold ${mov.tipo === 'ENTRADA' ? 'text-success-400' : 'text-danger-400'}`}>
                                                {mov.tipo === 'ENTRADA' ? '+' : '-'}R$ {mov.valor.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
