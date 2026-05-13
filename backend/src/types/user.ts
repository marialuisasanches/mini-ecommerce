export type UserRole = 'customer' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
};

export type CreateUserInput = {
  name: string;
  email: string;
  role: UserRole;
};

export type UpdateUserInput = CreateUserInput;
