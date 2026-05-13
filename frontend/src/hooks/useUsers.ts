import { useEffect, useState } from 'react';

import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
  toggleUserActive,
} from '@/services/userService';
import { User, UserFormValues } from '@/types/user';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers(): Promise<void> {
    setError(null);
    setIsLoading(true);

    try {
      const items = await listUsers();
      setUsers(items);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Falha ao carregar usuarios');
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshUsers(): Promise<void> {
    setIsRefreshing(true);

    try {
      const items = await listUsers();
      setUsers(items);
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleCreateUser(values: UserFormValues): Promise<User> {
    const user = await createUser(values);
    setUsers((currentUsers: User[]) => [user, ...currentUsers]);

    return user;
  }

  async function handleUpdateUser(id: string, values: UserFormValues): Promise<User> {
    const user = await updateUser(id, values);
    setUsers((currentUsers: User[]) =>
      currentUsers.map((currentUser) => (currentUser.id === id ? user : currentUser)),
    );

    return user;
  }

  async function handleDeleteUser(id: string): Promise<void> {
    await deleteUser(id);
    setUsers((currentUsers: User[]) => currentUsers.filter((user) => user.id !== id));
  }

  async function handleToggleActive(id: string, ativo: boolean): Promise<User> {
    const user = await toggleUserActive(id, ativo);

    setUsers((currentUsers: User[]) =>
      currentUsers.map((currentUser) => (currentUser.id === id ? user : currentUser)),
    );

    return user;
  }

  useEffect(() => {
    void fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    isRefreshing,
    error,
    fetchUsers,
    refreshUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleToggleActive,
  };
}
