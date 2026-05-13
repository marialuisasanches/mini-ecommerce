import { FastifyInstance } from 'fastify';

import { UserController } from '../controllers/userController';
import { validateBody, validateParams } from '../middleware/validateSchema';
import { createUserSchema, updateUserSchema, userIdParamsSchema } from '../schemas/userSchema';

export function registerUserRoutes(fastify: FastifyInstance, controller: UserController): void {
  fastify.post('/', { preValidation: validateBody(createUserSchema) }, async (request, reply) =>
    controller.create(request as never, reply),
  );
  fastify.get('/', async (request, reply) => controller.list(request, reply));
  fastify.get(
    '/:id',
    { preValidation: validateParams(userIdParamsSchema) },
    async (request, reply) => controller.getById(request as never, reply),
  );
  fastify.put(
    '/:id',
    { preValidation: [validateParams(userIdParamsSchema), validateBody(updateUserSchema)] },
    async (request, reply) => controller.update(request as never, reply),
  );
  fastify.delete(
    '/:id',
    { preValidation: validateParams(userIdParamsSchema) },
    async (request, reply) => controller.delete(request as never, reply),
  );
}
