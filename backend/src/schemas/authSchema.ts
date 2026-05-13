import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Nome do usuario e obrigatorio'),
  email: z.string().trim().email('Email invalido'),
  password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
  role: z.enum(['customer', 'admin']).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Email invalido'),
  password: z.string().min(1, 'Senha obrigatoria'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
