import { useState, useEffect } from 'react';
import { publicService, type CardapioData, type PedidoPublicoRequest } from '../services/publicService';
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    User,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    ArrowLeft,
} from 'lucide-react';

interface CartItem {
    produtoId: string;
    nome: string;
    preco: number;
    tamanhoMl: number | null;
    quantidade: number;
    complementos: { complementoId: string; nome: string; preco: number; quantidade: number }[];
}

export function PublicCardapio() {
    const [cardapio, setCardapio] = useState<CardapioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

    // Checkout fields
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [tipo, setTipo] = useState<'BALCAO' | 'DELIVERY'>('DELIVERY');
    const [obs, setObs] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        publicService.getCardapio().then(setCardapio).finally(() => setLoading(false));
    }, []);

    const addToCart = (produto: CardapioData['categorias'][0]['produtos'][0]) => {
        setCart(prev => {
            const existing = prev.find(p => p.produtoId === produto.id);
            if (existing) {
                return prev.map(p => p.produtoId === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p);
            }
            return [...prev, {
                produtoId: produto.id,
                nome: produto.nome,
                preco: produto.preco,
                tamanhoMl: produto.tamanhoMl,
                quantidade: 1,
                complementos: [],
            }];
        });
    };

    const updateQty = (produtoId: string, delta: number) => {
        setCart(prev => prev
            .map(p => p.produtoId === produtoId ? { ...p, quantidade: Math.max(0, p.quantidade + delta) } : p)
            .filter(p => p.quantidade > 0));
    };

    const toggleComplement = (produtoId: string, comp: CardapioData['complementos'][0]) => {
        setCart(prev => prev.map(item => {
            if (item.produtoId !== produtoId) return item;
            const has = item.complementos.find(c => c.complementoId === comp.id);
            if (has) {
                return { ...item, complementos: item.complementos.filter(c => c.complementoId !== comp.id) };
            }
            return {
                ...item, complementos: [...item.complementos, {
                    complementoId: comp.id, nome: comp.nome, preco: comp.precoAdicional, quantidade: 1,
                }]
            };
        }));
    };

    const getTotal = () => {
        return cart.reduce((total, item) => {
            const itemPrice = item.preco + item.complementos.reduce((s, c) => s + c.preco * c.quantidade, 0);
            return total + itemPrice * item.quantidade;
        }, 0);
    };

    const handleOrder = async () => {
        setSending(true);
        try {
            const pedido: PedidoPublicoRequest = {
                tipo,
                cliente: { nome, telefone, endereco: tipo === 'DELIVERY' ? endereco : undefined, bairro: tipo === 'DELIVERY' ? bairro : undefined },
                itens: cart.map(item => ({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    complementos: item.complementos.map(c => ({ complementoId: c.complementoId, quantidade: c.quantidade })),
                })),
                observacoes: obs || undefined,
                taxaEntrega: tipo === 'DELIVERY' ? 5.00 : 0,
            };
            const result = await publicService.criarPedido(pedido);
            setOrderSuccess(result.numeroPedido?.toString() || result.id);
            setCart([]);
        } catch {
            alert('Erro ao enviar pedido. Tente novamente.');
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary-950 flex items-center justify-center">
                <p className="text-text-muted">Carregando cardápio...</p>
            </div>
        );
    }

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-primary-950 flex items-center justify-center p-4">
                <div className="bg-surface-100 border border-surface-300 rounded-2xl p-8 max-w-sm text-center space-y-4">
                    <CheckCircle2 size={48} className="text-success-400 mx-auto" />
                    <h2 className="text-2xl font-bold text-text-primary">Pedido Enviado!</h2>
                    <p className="text-text-secondary">Seu pedido <span className="font-bold text-primary-300">#{orderSuccess}</span> foi recebido</p>
                    <p className="text-sm text-text-muted">Acompanhe o preparo pelo painel</p>
                    <button onClick={() => { setOrderSuccess(null); setShowCheckout(false); setShowCart(false); }}
                        className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold">
                        Novo Pedido
                    </button>
                </div>
            </div>
        );
    }

    const inputClass = "w-full bg-surface-200 border border-surface-300 rounded-xl py-3 px-4 text-text-primary placeholder-text-muted outline-none focus:border-primary-500";

    return (
        <div className="min-h-screen bg-primary-950">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-primary-900/90 backdrop-blur-md border-b border-surface-300 px-4 py-3">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {(showCart || showCheckout) && (
                            <button onClick={() => { setShowCheckout(false); setShowCart(false); }} className="p-1 text-text-muted hover:text-text-primary">
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <span className="text-xl">🍇</span>
                        <h1 className="text-lg font-bold text-text-primary">Açaí System</h1>
                    </div>
                    {!showCart && !showCheckout && (
                        <button onClick={() => setShowCart(true)}
                            className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-100 transition-all">
                            <ShoppingCart size={22} />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full text-[11px] font-bold flex items-center justify-center text-white">
                                    {cart.reduce((s, i) => s + i.quantidade, 0)}
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </header>

            <div className="max-w-2xl mx-auto p-4">
                {showCheckout ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-text-primary">Finalizar Pedido</h2>
                        <div className="flex gap-2">
                            {(['DELIVERY', 'BALCAO'] as const).map(t => (
                                <button key={t} onClick={() => setTipo(t)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${tipo === t ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-surface-100 border border-surface-300 text-text-muted'}`}>
                                    {t === 'DELIVERY' ? '🏍️ Delivery' : '🏪 Retirar'}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <div className="relative"><User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className={`${inputClass} pl-10`} /></div>
                            <div className="relative"><Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" className={`${inputClass} pl-10`} /></div>
                            {tipo === 'DELIVERY' && (
                                <>
                                    <div className="relative"><MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                                        <input value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço" className={`${inputClass} pl-10`} /></div>
                                    <input value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro" className={inputClass} />
                                </>
                            )}
                            <textarea value={obs} onChange={e => setObs(e.target.value)} placeholder="Observações (opcional)" rows={2} className={inputClass} />
                        </div>
                        <div className="border-t border-surface-300 pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-text-secondary">
                                <span>Subtotal</span><span>R$ {getTotal().toFixed(2)}</span>
                            </div>
                            {tipo === 'DELIVERY' && (
                                <div className="flex justify-between text-sm text-text-secondary">
                                    <span>Entrega</span><span>R$ 5,00</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-bold text-text-primary pt-2 border-t border-surface-300">
                                <span>Total</span><span>R$ {(getTotal() + (tipo === 'DELIVERY' ? 5 : 0)).toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={handleOrder} disabled={sending || !nome || !telefone || cart.length === 0}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            <Send size={18} />{sending ? 'Enviando...' : 'Enviar Pedido'}
                        </button>
                    </div>
                ) : showCart ? (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-text-primary">Seu Pedido</h2>
                        {cart.length === 0 ? (
                            <p className="text-text-muted text-center py-8">Carrinho vazio</p>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <div key={item.produtoId} className="bg-surface-100 border border-surface-300 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-medium text-text-primary">{item.nome}</span>
                                                {item.tamanhoMl && <span className="text-xs text-text-muted ml-1">({item.tamanhoMl}ml)</span>}
                                            </div>
                                            <span className="font-semibold text-primary-300">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => updateQty(item.produtoId, -1)} className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center text-text-muted hover:text-text-primary">
                                                {item.quantidade === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                            </button>
                                            <span className="font-semibold text-text-primary">{item.quantidade}</span>
                                            <button onClick={() => updateQty(item.produtoId, 1)} className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center text-text-muted hover:text-text-primary">
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        {cardapio && cardapio.complementos.length > 0 && (
                                            <div className="pt-2 border-t border-surface-300 space-y-1">
                                                <p className="text-xs text-text-muted font-medium">Complementos:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {cardapio.complementos.map(comp => {
                                                        const isAdded = item.complementos.some(c => c.complementoId === comp.id);
                                                        return (
                                                            <button key={comp.id} onClick={() => toggleComplement(item.produtoId, comp)}
                                                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${isAdded ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-surface-200 text-text-muted border border-transparent hover:border-surface-300'}`}>
                                                                {comp.nome} +R${comp.precoAdicional.toFixed(2)}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="flex justify-between text-lg font-bold text-text-primary pt-4 border-t border-surface-300">
                                    <span>Total</span><span>R$ {getTotal().toFixed(2)}</span>
                                </div>
                                <button onClick={() => setShowCheckout(true)}
                                    className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold transition-all hover:shadow-lg">
                                    Continuar
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    /* Menu */
                    <div className="space-y-6">
                        {cardapio?.categorias.map(cat => (
                            <div key={cat.id}>
                                <h2 className="text-lg font-bold text-text-primary mb-3">{cat.nome}</h2>
                                <div className="space-y-2">
                                    {cat.produtos.map(prod => (
                                        <button key={prod.id} onClick={() => addToCart(prod)}
                                            className="w-full flex items-center justify-between p-4 bg-surface-100 border border-surface-300 rounded-xl hover:bg-surface-200 transition-all text-left">
                                            <div>
                                                <p className="font-medium text-text-primary">{prod.nome}</p>
                                                <p className="text-xs text-text-muted">
                                                    {prod.tamanhoMl && `${prod.tamanhoMl}ml`}
                                                    {prod.descricao && ` • ${prod.descricao}`}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-primary-300">R$ {prod.preco.toFixed(2)}</span>
                                                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                                                    <Plus size={16} className="text-primary-400" />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating cart button */}
            {!showCart && !showCheckout && cart.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <button onClick={() => setShowCart(true)}
                        className="flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full py-3 px-6 font-semibold shadow-xl shadow-primary-500/30 transition-all hover:shadow-2xl">
                        <ShoppingCart size={20} />
                        Ver pedido • R$ {getTotal().toFixed(2)}
                    </button>
                </div>
            )}
        </div>
    );
}
