import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { StatusBadge } from '../components/ui/StatusBadge';
import { pedidoService } from '../services/pedidoService';
import type { PedidoResponse, OrderStatus } from '../types';
import {
    RefreshCw,
    ChevronRight,
    User,
    MapPin,
    Phone,
    Clock,
} from 'lucide-react';

const statusFilters: { label: string; value: OrderStatus | 'TODOS' }[] = [
    { label: 'Todos', value: 'TODOS' },
    { label: 'Pendentes', value: 'PENDENTE' },
    { label: 'Preparando', value: 'PREPARANDO' },
    { label: 'Prontos', value: 'PRONTO' },
    { label: 'Entregues', value: 'ENTREGUE' },
];

export function PedidosPage() {
    const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
    const [filtro, setFiltro] = useState<OrderStatus | 'TODOS'>('TODOS');
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<PedidoResponse | null>(null);

    const loadPedidos = async () => {
        setLoading(true);
        try {
            const data = filtro === 'TODOS'
                ? await pedidoService.listarTodos()
                : await pedidoService.listarPorStatus(filtro);
            setPedidos(data);
        } catch (err) {
            console.error('Erro ao carregar pedidos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPedidos();
    }, [filtro]);

    const handleStatusUpdate = async (id: string, novoStatus: OrderStatus) => {
        try {
            const updated = await pedidoService.atualizarStatus(id, novoStatus);
            setPedidos(prev => prev.map(p => p.id === id ? updated : p));
            if (selected?.id === id) setSelected(updated);
        } catch (err) {
            alert('Erro ao atualizar status');
        }
    };

    const getNextStatus = (status: OrderStatus): OrderStatus | null => {
        const transitions: Record<string, OrderStatus> = {
            PENDENTE: 'PREPARANDO',
            PREPARANDO: 'PRONTO',
            PRONTO: 'ENTREGUE',
        };
        return transitions[status] || null;
    };

    const getNextLabel = (status: OrderStatus): string => {
        const labels: Record<string, string> = {
            PENDENTE: 'Preparar',
            PREPARANDO: 'Pronto',
            PRONTO: 'Entregar',
        };
        return labels[status] || '';
    };

    const formatTime = (dateStr: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            <Header title="Pedidos" />
            <div className="p-6 flex gap-6 h-[calc(100vh-73px)]">
                {/* Left: Order list */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                            {statusFilters.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setFiltro(f.value)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filtro === f.value
                                            ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                                            : 'text-text-muted hover:bg-surface-100 border border-transparent'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <button onClick={loadPedidos} className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-100 transition-all">
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                        {pedidos.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-text-muted">
                                <p>Nenhum pedido encontrado</p>
                            </div>
                        ) : (
                            pedidos.map((pedido) => (
                                <button
                                    key={pedido.id}
                                    onClick={() => setSelected(pedido)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === pedido.id
                                            ? 'bg-primary-500/10 border-primary-500/30'
                                            : 'bg-surface-100 border-surface-300 hover:bg-surface-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-text-primary">#{pedido.numeroPedido}</span>
                                        <StatusBadge status={pedido.status} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-text-secondary">
                                            {pedido.cliente?.nome || 'Cliente balcão'} • {pedido.itens.length} item(s)
                                        </span>
                                        <span className="text-sm font-semibold text-primary-300">
                                            R$ {pedido.total.toFixed(2)}
                                        </span>
                                    </div>
                                    {pedido.criadoEm && (
                                        <div className="flex items-center gap-1 mt-1 text-xs text-text-muted">
                                            <Clock size={12} />
                                            {formatTime(pedido.criadoEm)}
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Order detail */}
                <div className="w-96 bg-surface-100 border border-surface-300 rounded-2xl p-6 overflow-y-auto">
                    {selected ? (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-text-primary">Pedido #{selected.numeroPedido}</h3>
                                <StatusBadge status={selected.status} size="md" />
                            </div>

                            {selected.cliente && (
                                <div className="bg-surface-200 rounded-xl p-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-text-primary">
                                        <User size={14} className="text-primary-400" />
                                        {selected.cliente.nome}
                                    </div>
                                    {selected.cliente.telefone && (
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <Phone size={14} className="text-text-muted" />
                                            {selected.cliente.telefone}
                                        </div>
                                    )}
                                    {selected.cliente.endereco && (
                                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                                            <MapPin size={14} className="text-text-muted" />
                                            {selected.cliente.endereco}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div>
                                <h4 className="text-sm font-semibold text-text-secondary mb-3">Itens</h4>
                                <div className="space-y-3">
                                    {selected.itens.map((item) => (
                                        <div key={item.id} className="bg-surface-200 rounded-xl p-3">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-text-primary">
                                                    {item.quantidade}x {item.produtoNome}
                                                    {item.tamanhoMl && <span className="text-text-muted ml-1">({item.tamanhoMl}ml)</span>}
                                                </span>
                                                <span className="text-sm font-semibold text-primary-300">
                                                    R$ {item.precoTotal.toFixed(2)}
                                                </span>
                                            </div>
                                            {item.complementos.length > 0 && (
                                                <div className="mt-1 pl-3 border-l-2 border-surface-300">
                                                    {item.complementos.map((comp, i) => (
                                                        <p key={i} className="text-xs text-text-muted">
                                                            + {comp.quantidade}x {comp.complementoNome} (R$ {comp.preco.toFixed(2)})
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selected.observacoes && (
                                <div className="bg-warning-500/10 border border-warning-500/20 rounded-xl p-3">
                                    <p className="text-sm text-warning-400">📝 {selected.observacoes}</p>
                                </div>
                            )}

                            <div className="border-t border-surface-300 pt-4 space-y-1">
                                <div className="flex justify-between text-sm text-text-secondary">
                                    <span>Subtotal</span>
                                    <span>R$ {selected.subtotal.toFixed(2)}</span>
                                </div>
                                {selected.taxaEntrega > 0 && (
                                    <div className="flex justify-between text-sm text-text-secondary">
                                        <span>Taxa de entrega</span>
                                        <span>R$ {selected.taxaEntrega.toFixed(2)}</span>
                                    </div>
                                )}
                                {selected.desconto > 0 && (
                                    <div className="flex justify-between text-sm text-success-400">
                                        <span>Desconto</span>
                                        <span>-R$ {selected.desconto.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold text-text-primary pt-2 border-t border-surface-300">
                                    <span>Total</span>
                                    <span>R$ {selected.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2">
                                {getNextStatus(selected.status) && (
                                    <button
                                        onClick={() => handleStatusUpdate(selected.id, getNextStatus(selected.status)!)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold transition-all hover:from-primary-400 hover:to-primary-600 hover:shadow-lg hover:shadow-primary-500/20"
                                    >
                                        {getNextLabel(selected.status)}
                                        <ChevronRight size={16} />
                                    </button>
                                )}
                                {selected.status !== 'CANCELADO' && selected.status !== 'ENTREGUE' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selected.id, 'CANCELADO')}
                                        className="px-4 py-3 rounded-xl border border-danger-500/30 text-danger-400 font-medium transition-all hover:bg-danger-500/10"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-text-muted">
                            <p>Selecione um pedido para ver detalhes</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
