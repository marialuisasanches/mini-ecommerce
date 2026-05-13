import { Edit3, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/types/user';
import { formatDate } from '@/utils/formatDate';
import { useAuth } from '@/hooks/useAuth';

type UserTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleActive?: (id: string, ativo: boolean) => void;
};

function UserMobileCard({
  user,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleActive?: (id: string, ativo: boolean) => void;
}): JSX.Element {
  const auth = useAuth();
  return (
    <Card className="border-white/80 bg-white/95 shadow-soft md:hidden">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold">{user.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant={user.role === 'admin' ? 'secondary' : 'outline'}>{user.role}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-muted/60 p-3">
            <span className="block text-muted-foreground">Criado em</span>
            <span className="font-semibold">{formatDate(user.createdAt)}</span>
          </div>
          <div className="rounded-xl bg-muted/60 p-3">
            <span className="block text-muted-foreground">Perfil</span>
            <span className="font-semibold">{user.role}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {auth.user?.role === 'admin' && (
            <>
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(user)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => onToggleActive && onToggleActive(user.id, !user.ativo)}
              >
                {user.ativo ? 'Desativar' : 'Ativar'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => onDelete(user)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remover
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function UserTable({
  users,
  onEdit,
  onDelete,
  onToggleActive,
}: UserTableProps): JSX.Element {
  const auth = useAuth();
  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/80 p-10 text-center text-sm text-muted-foreground shadow-soft">
        Nenhum usuário encontrado. Crie o primeiro registro para iniciar o controle.
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-soft md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <p className="font-semibold text-foreground">{user.name}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'secondary' : 'subtle'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${user.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-destructive/10 text-destructive'}`}
                  >
                    {user.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {auth.user?.role === 'admin' && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
                          <Edit3 className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onToggleActive && onToggleActive(user.id, !user.ativo)}
                        >
                          {user.ativo ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => onDelete(user)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remover
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <UserMobileCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleActive={onToggleActive}
          />
        ))}
      </div>
    </>
  );
}
