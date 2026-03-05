import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Bell, User } from 'lucide-react';

interface HeaderProps {
    title: string;
}

export function Header({ title }: HeaderProps) {
    const { user, logout } = useAuth();

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-surface-300 bg-primary-950/60 backdrop-blur-md">
            <h2 className="text-xl font-bold text-text-primary">{title}</h2>

            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-100 transition-all">
                    <Bell size={20} />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 rounded-full text-[10px] font-bold flex items-center justify-center">
                        3
                    </span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-surface-300">
                    <div className="w-8 h-8 rounded-full bg-primary-500/30 flex items-center justify-center">
                        <User size={16} className="text-primary-300" />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-text-primary">{user?.nome}</p>
                        <p className="text-xs text-text-muted">{user?.role}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 rounded-lg text-text-muted hover:text-danger-400 hover:bg-danger-500/10 transition-all"
                        title="Sair"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}
