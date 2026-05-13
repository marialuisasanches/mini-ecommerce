import { DollarSign, Package, TrendingUp } from 'lucide-react';
import type { ComponentType } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatCurrency';

type ProductStatsProps = {
  totalProducts: number;
  totalStock: number;
  inventoryValue: number;
  totalCategories: number;
  activeProducts: number;
};

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  helper: string;
}): JSX.Element {
  return (
    <Card className="border-white/70 bg-white/90 backdrop-blur-xl">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {(() => {
            const len = value?.length ?? 0;
            let sizeClass = 'text-2xl';
            if (len > 20) sizeClass = 'text-sm';
            else if (len > 16) sizeClass = 'text-lg';
            else if (len > 12) sizeClass = 'text-xl';
            return (
              <p
                className={`${sizeClass} font-display font-semibold tracking-tight truncate overflow-hidden whitespace-nowrap`}
                title={value}
              >
                {value}
              </p>
            );
          })()}
          <p className="text-xs text-muted-foreground">{helper}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductStats({
  totalProducts,
  totalStock,
  inventoryValue,
  totalCategories,
  activeProducts,
}: ProductStatsProps): JSX.Element {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        icon={Package}
        label="Produtos cadastrados"
        value={String(totalProducts)}
        helper="Catálogo ativo e visivel"
      />
      <StatCard
        icon={TrendingUp}
        label="Estoque total"
        value={String(totalStock)}
        helper="Unidades disponíveis no sistema"
      />
      <StatCard
        icon={DollarSign}
        label="Valor do estoque"
        value={formatCurrency(inventoryValue)}
        helper="Baseado no preco atual dos produtos"
      />
      <StatCard
        icon={Package}
        label="Categorias"
        value={String(totalCategories)}
        helper="Categorias distintas no catálogo"
      />
      <StatCard
        icon={TrendingUp}
        label="Produtos ativos"
        value={String(activeProducts)}
        helper="Itens com estoque acima de zero"
      />
    </div>
  );
}
