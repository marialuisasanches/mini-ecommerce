import { z } from 'zod';

export const userBaseSchema = z.object({
  name: z.string().trim().min(1, 'Nome do usuario e obrigatorio'),
  email: z.string().trim().email('Email invalido'),
  role: z.enum(['customer', 'admin']),
});

export const createUserSchema = userBaseSchema;

export const updateUserSchema = userBaseSchema;

export const userIdParamsSchema = z.object({
  id: z.string().uuid('Id do usuario invalido'),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type UserIdParamsSchema = z.infer<typeof userIdParamsSchema>;
