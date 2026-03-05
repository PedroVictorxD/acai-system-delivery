import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { catalogoService } from '../services/catalogoService';
import type { CategoriaResponse, ComplementoResponse } from '../types';
import {
    Plus,
    ChevronRight,
    Package,
    Coffee,
    Edit,
    ToggleLeft,
    ToggleRight,
} from 'lucide-react';

type Tab = 'categorias' | 'complementos';

export function CardapioPage() {
    const [tab, setTab] = useState<Tab>('categorias');
    const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
    const [complementos, setComplementos] = useState<ComplementoResponse[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [showCatForm, setShowCatForm] = useState(false);
    const [catNome, setCatNome] = useState('');
    const [catDescricao, setCatDescricao] = useState('');

    const [showProdForm, setShowProdForm] = useState(false);
    const [prodCatId, setProdCatId] = useState('');
    const [prodNome, setProdNome] = useState('');
    const [prodPreco, setProdPreco] = useState('');
    const [prodTamanho, setProdTamanho] = useState('');

    const [showCompForm, setShowCompForm] = useState(false);
    const [compNome, setCompNome] = useState('');
    const [compPreco, setCompPreco] = useState('');

    const loadData = async () => {
        setLoading(true);
        try {
            const [cats, comps] = await Promise.all([
                catalogoService.listarCategorias(),
                catalogoService.listarComplementos(),
            ]);
            setCategorias(cats);
            setComplementos(comps);
        } catch (err) {
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleCriarCategoria = async () => {
        try {
            await catalogoService.criarCategoria({ nome: catNome, descricao: catDescricao });
            setShowCatForm(false);
            setCatNome(''); setCatDescricao('');
            loadData();
        } catch { alert('Erro ao criar categoria'); }
    };

    const handleCriarProduto = async () => {
        try {
            await catalogoService.criarProduto({
                categoriaId: prodCatId,
                nome: prodNome,
                preco: parseFloat(prodPreco),
                tamanhoMl: prodTamanho ? parseInt(prodTamanho) : undefined,
            });
            setShowProdForm(false);
            setProdNome(''); setProdPreco(''); setProdTamanho('');
            loadData();
        } catch { alert('Erro ao criar produto'); }
    };

    const handleCriarComplemento = async () => {
        try {
            await catalogoService.criarComplemento({
                nome: compNome,
                precoAdicional: parseFloat(compPreco),
            });
            setShowCompForm(false);
            setCompNome(''); setCompPreco('');
            loadData();
        } catch { alert('Erro ao criar complemento'); }
    };

    const handleToggleCategoria = async (id: string) => {
        await catalogoService.toggleCategoria(id);
        loadData();
    };

    const handleToggleProduto = async (id: string) => {
        await catalogoService.toggleProduto(id);
        loadData();
    };

    const handleToggleComplemento = async (id: string) => {
        await catalogoService.toggleComplemento(id);
        loadData();
    };

    const inputClass = "w-full bg-surface-200 border border-surface-300 rounded-xl py-3 px-4 text-text-primary placeholder-text-muted outline-none focus:border-primary-500";

    return (
        <>
            <Header title="Cardápio" />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        {(['categorias', 'complementos'] as Tab[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${tab === t
                                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                                        : 'text-text-muted hover:bg-surface-100 border border-transparent'
                                    }`}
                            >
                                {t === 'categorias' ? 'Categorias & Produtos' : 'Complementos'}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => tab === 'categorias' ? setShowCatForm(true) : setShowCompForm(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-2.5 px-4 font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/20"
                    >
                        <Plus size={18} />
                        {tab === 'categorias' ? 'Nova Categoria' : 'Novo Complemento'}
                    </button>
                </div>

                {/* Create category form */}
                {showCatForm && (
                    <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6 max-w-md space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary">Nova Categoria</h3>
                        <input value={catNome} onChange={e => setCatNome(e.target.value)} placeholder="Nome" className={inputClass} />
                        <input value={catDescricao} onChange={e => setCatDescricao(e.target.value)} placeholder="Descrição" className={inputClass} />
                        <div className="flex gap-2">
                            <button onClick={handleCriarCategoria} className="flex-1 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold">Criar</button>
                            <button onClick={() => setShowCatForm(false)} className="px-4 py-3 rounded-xl border border-surface-300 text-text-muted">Cancelar</button>
                        </div>
                    </div>
                )}

                {/* Create complement form */}
                {showCompForm && (
                    <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6 max-w-md space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary">Novo Complemento</h3>
                        <input value={compNome} onChange={e => setCompNome(e.target.value)} placeholder="Nome" className={inputClass} />
                        <input type="number" step="0.01" value={compPreco} onChange={e => setCompPreco(e.target.value)} placeholder="Preço adicional (R$)" className={inputClass} />
                        <div className="flex gap-2">
                            <button onClick={handleCriarComplemento} className="flex-1 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold">Criar</button>
                            <button onClick={() => setShowCompForm(false)} className="px-4 py-3 rounded-xl border border-surface-300 text-text-muted">Cancelar</button>
                        </div>
                    </div>
                )}

                {/* Create product form */}
                {showProdForm && (
                    <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6 max-w-md space-y-4">
                        <h3 className="text-lg font-semibold text-text-primary">Novo Produto</h3>
                        <select value={prodCatId} onChange={e => setProdCatId(e.target.value)} className={inputClass}>
                            <option value="">Selecione a categoria</option>
                            {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                        </select>
                        <input value={prodNome} onChange={e => setProdNome(e.target.value)} placeholder="Nome do produto" className={inputClass} />
                        <input type="number" step="0.01" value={prodPreco} onChange={e => setProdPreco(e.target.value)} placeholder="Preço (R$)" className={inputClass} />
                        <input type="number" value={prodTamanho} onChange={e => setProdTamanho(e.target.value)} placeholder="Tamanho (ml) - opcional" className={inputClass} />
                        <div className="flex gap-2">
                            <button onClick={handleCriarProduto} className="flex-1 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl py-3 font-semibold">Criar</button>
                            <button onClick={() => setShowProdForm(false)} className="px-4 py-3 rounded-xl border border-surface-300 text-text-muted">Cancelar</button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <p className="text-text-muted">Carregando...</p>
                ) : tab === 'categorias' ? (
                    <div className="space-y-4">
                        {categorias.length === 0 ? (
                            <p className="text-text-muted text-center py-8">Nenhuma categoria cadastrada</p>
                        ) : categorias.map((cat) => (
                            <div key={cat.id} className="bg-surface-100 border border-surface-300 rounded-2xl overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-surface-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                            <Coffee size={18} className="text-primary-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-text-primary">{cat.nome}</h4>
                                            {cat.descricao && <p className="text-xs text-text-muted">{cat.descricao}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => { setProdCatId(cat.id); setShowProdForm(true); }}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-success-500/15 text-success-400 hover:bg-success-500/25 transition-all">
                                            <Plus size={14} /> Produto
                                        </button>
                                        <button onClick={() => handleToggleCategoria(cat.id)}
                                            className="p-2 rounded-lg hover:bg-surface-200 transition-all">
                                            {cat.ativa ? <ToggleRight size={20} className="text-success-400" /> : <ToggleLeft size={20} className="text-text-muted" />}
                                        </button>
                                    </div>
                                </div>
                                {cat.produtos && cat.produtos.length > 0 && (
                                    <div className="divide-y divide-surface-300">
                                        {cat.produtos.map((prod) => (
                                            <div key={prod.id} className="flex items-center justify-between px-4 py-3 hover:bg-surface-200 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <Package size={16} className="text-text-muted" />
                                                    <div>
                                                        <span className="text-sm font-medium text-text-primary">{prod.nome}</span>
                                                        {prod.tamanhoMl && <span className="text-xs text-text-muted ml-2">{prod.tamanhoMl}ml</span>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-semibold text-primary-300">R$ {prod.preco.toFixed(2)}</span>
                                                    <button onClick={() => handleToggleProduto(prod.id)}
                                                        className="p-1 rounded hover:bg-surface-300 transition-all">
                                                        {prod.disponivel ? <ToggleRight size={18} className="text-success-400" /> : <ToggleLeft size={18} className="text-text-muted" />}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {complementos.length === 0 ? (
                            <p className="text-text-muted text-center py-8">Nenhum complemento cadastrado</p>
                        ) : complementos.map((comp) => (
                            <div key={comp.id} className="flex items-center justify-between p-4 bg-surface-100 border border-surface-300 rounded-xl hover:bg-surface-200 transition-all">
                                <div>
                                    <span className="font-medium text-text-primary">{comp.nome}</span>
                                    <span className="text-sm text-text-muted ml-2">máx. {comp.maxPorPedido}/pedido</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-primary-300">+R$ {comp.precoAdicional.toFixed(2)}</span>
                                    <button onClick={() => handleToggleComplemento(comp.id)}
                                        className="p-1 rounded hover:bg-surface-300 transition-all">
                                        {comp.disponivel ? <ToggleRight size={18} className="text-success-400" /> : <ToggleLeft size={18} className="text-text-muted" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
