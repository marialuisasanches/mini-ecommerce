import { Shield, Users, UserRound } from 'lucide-react';
import type { ComponentType } from 'react';

import { Card, CardContent } from '@/components/ui/card';

type UserStatsProps = {
  totalUsers: number;
  totalCustomers: number;
  totalAdmins: number;
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
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="truncate font-display text-2xl font-semibold tracking-tight" title={value}>
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{helper}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserStats({
  totalUsers,
  totalCustomers,
  totalAdmins,
}: UserStatsProps): JSX.Element {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        icon={Users}
        label="Usuários cadastrados"
        value={String(totalUsers)}
        helper="Base ativa no sistema"
      />
      <StatCard
        icon={UserRound}
        label="Clientes"
        value={String(totalCustomers)}
        helper="Perfis customer"
      />
      <StatCard
        icon={Shield}
        label="Administradores"
        value={String(totalAdmins)}
        helper="Perfis admin"
      />
    </div>
  );
}
