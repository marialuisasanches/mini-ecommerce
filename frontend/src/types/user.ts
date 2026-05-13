export type UserRole = 'customer' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  ativo: boolean;
  createdAt: string;
};

export type UserFormValues = {
  name: string;
  email: string;
  role: UserRole;
  ativo?: boolean;
};

export type ApiSuccessResponse<T> = {
  data: T;
};

export type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: string;
  };
};
