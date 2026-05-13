export type UserRole = 'customer' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  ativo: boolean;
  createdAt: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  role?: UserRole;
  password?: string;
};

export type UpdateUserInput = {
  name: string;
  email: string;
  role: UserRole;
  ativo?: boolean;
};
