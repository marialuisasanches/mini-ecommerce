import { FastifyInstance } from 'fastify';

import { ProductController } from '../controllers/productController';
import { validateBody, validateParams } from '../middleware/validateSchema';
import {
  createProductSchema,
  productIdParamsSchema,
  updateProductSchema,
} from '../schemas/productSchema';

export function registerProductRoutes(
  fastify: FastifyInstance,
  controller: ProductController,
): void {
  fastify.post('/', { preValidation: validateBody(createProductSchema) }, async (request, reply) =>
    controller.create(request as never, reply),
  );
  fastify.get('/', async (request, reply) => controller.list(request, reply));
  fastify.get(
    '/:id',
    { preValidation: validateParams(productIdParamsSchema) },
    async (request, reply) => controller.getById(request as never, reply),
  );
  fastify.put(
    '/:id',
    { preValidation: [validateParams(productIdParamsSchema), validateBody(updateProductSchema)] },
    async (request, reply) => controller.update(request as never, reply),
  );
  fastify.delete(
    '/:id',
    { preValidation: validateParams(productIdParamsSchema) },
    async (request, reply) => controller.delete(request as never, reply),
  );
}
