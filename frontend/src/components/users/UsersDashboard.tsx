import { Filter, PlusCircle, RefreshCcw, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DeleteUserDialog } from '@/components/users/DeleteUserDialog';
import { UserFormDialog } from '@/components/users/UserFormDialog';
import { UserStats } from '@/components/users/UserStats';
import { UserTable } from '@/components/users/UserTable';
import { useUsers } from '@/hooks/useUsers';
import { User, UserFormValues } from '@/types/user';

type UserRoleFilter = 'all' | 'customer' | 'admin';

export function UsersDashboard(): JSX.Element {
  const {
    users,
    isLoading,
    isRefreshing,
    error,
    refreshUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleToggleActive,
  } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>('all');

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === 'admin').length;
  const totalCustomers = users.filter((user) => user.role === 'customer').length;

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [user.name, user.email, user.role].join(' ').toLowerCase().includes(normalizedSearch);
      const matchesRole =
        roleFilter === 'all' ||
        (roleFilter === 'customer' && user.role === 'customer') ||
        (roleFilter === 'admin' && user.role === 'admin');

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  function handleOpenCreate(): void {
    setSelectedUser(null);
    setIsFormOpen(true);
  }

  async function handleRefresh(): Promise<void> {
    try {
      await refreshUsers();
      toast.success('Usuários atualizados.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Falha ao atualizar usuários.');
    }
  }

  function handleOpenEdit(user: User): void {
    setSelectedUser(user);
    setIsFormOpen(true);
  }

  function handleOpenDelete(user: User): void {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  }

  async function handleSubmit(values: UserFormValues): Promise<void> {
    setIsSubmitting(true);

    try {
      if (selectedUser) {
        await handleUpdateUser(selectedUser.id, values);
        toast.success('Usuário atualizado com sucesso.');
      } else {
        await handleCreateUser(values);
        toast.success('Usuário criado com sucesso.');
      }
    } catch (submitError) {
      toast.error(
        submitError instanceof Error ? submitError.message : 'Nao foi possivel salvar o usuário.',
      );
      throw submitError;
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmDelete(): Promise<void> {
    if (!selectedUser) {
      return;
    }

    setIsDeleting(true);

    try {
      await handleDeleteUser(selectedUser.id);
      toast.success('Usuário removido com sucesso.');
      setSelectedUser(null);
    } catch (deleteError) {
      toast.error(
        deleteError instanceof Error ? deleteError.message : 'Nao foi possivel remover o usuário.',
      );
      throw deleteError;
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleToggle(user: User): Promise<void> {
    try {
      await handleToggleActive(user.id, !user.ativo);
      toast.success(`Usuário ${user.ativo ? 'desativado' : 'ativado'} com sucesso.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Falha ao atualizar estado do usuário.');
    }
  }

  return (
    <AppShell>
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-soft backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Gestão de usuários
              </div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Controle de acesso e cadastro centralizado.
              </h2>
              <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
                Gerencie perfis, acompanhe administradores e localize usuários com busca e filtros.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <Button
                variant="outline"
                onClick={() => void handleRefresh()}
                disabled={isRefreshing}
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button onClick={handleOpenCreate}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo usuário
              </Button>
            </div>
          </div>
        </div>

        <UserStats
          totalUsers={totalUsers}
          totalCustomers={totalCustomers}
          totalAdmins={totalAdmins}
        />

        <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nome, email ou perfil"
                className="h-12 pl-11"
              />
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filtros
              </div>

              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value as UserRoleFilter)}
                className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-ring"
              >
                <option value="all">Todos os perfis</option>
                <option value="customer">customer</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="subtle" className="rounded-full px-3 py-1">
              {filteredUsers.length} resultados
            </Badge>
            <Badge variant="subtle" className="rounded-full px-3 py-1">
              {totalAdmins} admins
            </Badge>
            <Badge variant="subtle" className="rounded-full px-3 py-1">
              {totalCustomers} customers
            </Badge>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive shadow-soft">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-white/80 bg-white/90 p-10 text-center text-sm text-muted-foreground shadow-soft">
            Carregando usuários...
          </div>
        ) : (
          <UserTable
            users={filteredUsers}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
            onToggleActive={(id, ativo) =>
              void handleToggle(users.find((u) => u.id === id) as User)
            }
          />
        )}
      </section>

      <UserFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmit}
        user={selectedUser}
        isSubmitting={isSubmitting}
      />

      <DeleteUserDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={selectedUser}
        onConfirm={handleConfirmDelete}
        isSubmitting={isDeleting}
      />
    </AppShell>
  );
}
