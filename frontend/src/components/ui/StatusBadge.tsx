import type { OrderStatus } from '../../types';
import {
    Clock,
    ChefHat,
    CheckCircle2,
    Truck,
    XCircle,
} from 'lucide-react';

interface StatusBadgeProps {
    status: OrderStatus;
    size?: 'sm' | 'md';
}

const statusConfig: Record<OrderStatus, { label: string; icon: React.ElementType; className: string }> = {
    PENDENTE: {
        label: 'Pendente',
        icon: Clock,
        className: 'bg-warning-500/15 text-warning-400 border-warning-500/30',
    },
    PREPARANDO: {
        label: 'Preparando',
        icon: ChefHat,
        className: 'bg-primary-500/15 text-primary-400 border-primary-500/30',
    },
    PRONTO: {
        label: 'Pronto',
        icon: CheckCircle2,
        className: 'bg-success-500/15 text-success-400 border-success-500/30',
    },
    ENTREGUE: {
        label: 'Entregue',
        icon: Truck,
        className: 'bg-text-muted/15 text-text-muted border-text-muted/30',
    },
    CANCELADO: {
        label: 'Cancelado',
        icon: XCircle,
        className: 'bg-danger-500/15 text-danger-400 border-danger-500/30',
    },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <span className={`
      inline-flex items-center gap-1.5 border rounded-full font-medium
      ${config.className}
      ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
    `}>
            <Icon size={size === 'sm' ? 12 : 14} />
            {config.label}
        </span>
    );
}
