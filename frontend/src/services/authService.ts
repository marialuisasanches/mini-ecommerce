import { api } from './api';
import { User } from '@/types/user';

type LoginCredentials = { email: string; password: string };

export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
  const response = await api.post('/auth/login', credentials);

  return response.data.data;
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

type RegisterPayload = { name: string; email: string; password: string };

export async function register(payload: RegisterPayload): Promise<{ user: User; token?: string }> {
  const response = await api.post('/auth/register', payload);

  return response.data.data;
}
