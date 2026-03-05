import { Header } from '../components/layout/Header';
import { ShoppingCart, DollarSign, Users, TrendingUp } from 'lucide-react';

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: string;
    color: string;
}

function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
    return (
        <div className="bg-surface-100 border border-surface-300 rounded-2xl p-5 flex items-center gap-4 hover:bg-surface-200 transition-all">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={22} />
            </div>
            <div>
                <p className="text-sm text-text-muted">{label}</p>
                <p className="text-2xl font-bold text-text-primary">{value}</p>
                {trend && <p className="text-xs text-success-400 mt-0.5">{trend}</p>}
            </div>
        </div>
    );
}

export function DashboardPage() {
    return (
        <>
            <Header title="Dashboard" />
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={ShoppingCart}
                        label="Pedidos Hoje"
                        value="0"
                        trend="+0% vs ontem"
                        color="bg-primary-500/20 text-primary-400"
                    />
                    <StatCard
                        icon={DollarSign}
                        label="Faturamento"
                        value="R$ 0"
                        trend="+0% vs ontem"
                        color="bg-success-500/20 text-success-400"
                    />
                    <StatCard
                        icon={Users}
                        label="Clientes"
                        value="0"
                        color="bg-accent-500/20 text-accent-400"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Ticket Médio"
                        value="R$ 0"
                        color="bg-warning-500/20 text-warning-400"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Pedidos Recentes</h3>
                        <p className="text-text-muted text-sm">Nenhum pedido ainda. Crie o primeiro pedido na aba Pedidos.</p>
                    </div>

                    <div className="bg-surface-100 border border-surface-300 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">Status do Caixa</h3>
                        <p className="text-text-muted text-sm">Nenhum caixa aberto. Abra o caixa na aba Caixa.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
