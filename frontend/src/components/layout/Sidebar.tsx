import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    UtensilsCrossed,
    Package,
    Users,
    Wallet,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/pedidos', icon: ShoppingCart, label: 'Pedidos' },
    { path: '/cardapio', icon: UtensilsCrossed, label: 'Cardápio' },
    { path: '/produtos', icon: Package, label: 'Produtos' },
    { path: '/clientes', icon: Users, label: 'Clientes' },
    { path: '/caixa', icon: Wallet, label: 'Caixa' },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside className={`
      fixed left-0 top-0 h-screen bg-primary-900/80 backdrop-blur-xl
      border-r border-surface-300 flex flex-col transition-all duration-300 z-50
      ${collapsed ? 'w-16' : 'w-56'}
    `}>
            <div className={`flex items-center gap-3 p-4 border-b border-surface-300 ${collapsed ? 'justify-center' : ''}`}>
                <span className="text-2xl">🍇</span>
                {!collapsed && (
                    <h1 className="text-lg font-bold text-text-primary whitespace-nowrap">Açaí System</h1>
                )}
            </div>

            <nav className="flex-1 py-3 flex flex-col gap-1 px-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path ||
                        (item.path !== '/' && location.pathname.startsWith(item.path));

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${collapsed ? 'justify-center' : ''}
                ${isActive
                                    ? 'bg-primary-500/20 text-primary-300 shadow-md shadow-primary-500/10'
                                    : 'text-text-secondary hover:bg-surface-100 hover:text-text-primary'
                                }
              `}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon size={20} className={isActive ? 'text-primary-400' : ''} />
                            {!collapsed && (
                                <span className="text-sm font-medium">{item.label}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center justify-center p-3 border-t border-surface-300 text-text-muted hover:text-text-primary transition-colors"
            >
                {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
        </aside>
    );
}
