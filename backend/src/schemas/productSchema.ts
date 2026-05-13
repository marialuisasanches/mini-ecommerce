import { z } from 'zod';

const optionalImageUrlSchema = z
  .union([z.string().url(), z.literal(''), z.null()])
  .optional()
  .transform((value) => {
    if (value === '' || value === undefined) {
      return undefined;
    }

    return value;
  });

export const productBaseSchema = z.object({
  name: z.string().trim().min(1, 'Nome do produto e obrigatorio'),
  description: z.string().trim().min(1, 'Descricao do produto e obrigatoria'),
  price: z.number().finite().positive('Preco deve ser maior que zero'),
  stock: z.number().int().nonnegative('Estoque nao pode ser negativo'),
  category: z.string().trim().min(1, 'Categoria do produto e obrigatoria'),
  imageUrl: optionalImageUrlSchema,
});

export const createProductSchema = productBaseSchema;

export const updateProductSchema = productBaseSchema;

export const productIdParamsSchema = z.object({
  id: z.string().uuid('Id do produto invalido'),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type ProductIdParamsSchema = z.infer<typeof productIdParamsSchema>;
