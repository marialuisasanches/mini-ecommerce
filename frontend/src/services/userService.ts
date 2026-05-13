import { api } from './api';
import { ApiSuccessResponse, User, UserFormValues } from '../types/user';

const USERS_ENDPOINT = '/users';

type UserResponse = ApiSuccessResponse<User>;
type UserListResponse = ApiSuccessResponse<User[]>;

function normalizeUserPayload(values: UserFormValues): UserFormValues {
  return {
    ...values,
    name: values.name.trim(),
    email: values.email.trim(),
  };
}

export async function listUsers(): Promise<User[]> {
  const response = await api.get<UserListResponse>(USERS_ENDPOINT);

  return response.data.data;
}

export async function createUser(values: UserFormValues): Promise<User> {
  const response = await api.post<UserResponse>(USERS_ENDPOINT, normalizeUserPayload(values));

  return response.data.data;
}

export async function updateUser(id: string, values: UserFormValues): Promise<User> {
  const response = await api.put<UserResponse>(
    `${USERS_ENDPOINT}/${id}`,
    normalizeUserPayload(values),
  );

  return response.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`${USERS_ENDPOINT}/${id}`);
}

export async function getUserById(id: string): Promise<User> {
  const response = await api.get<UserResponse>(`${USERS_ENDPOINT}/${id}`);

  return response.data.data;
}

export async function toggleUserActive(id: string, active: boolean): Promise<User> {
  // Obtain current user and perform an update including existing fields to satisfy backend validation
  const user = await getUserById(id);

  const payload = normalizeUserPayload({
    name: user.name,
    email: user.email,
    role: user.role,
    ativo: active,
  } as UserFormValues);

  const response = await api.put<UserResponse>(`${USERS_ENDPOINT}/${id}`, payload);

  return response.data.data;
}
