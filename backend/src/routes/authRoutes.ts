import { FastifyInstance } from 'fastify';

import { AuthController } from '../controllers/authController';
import { validateBody } from '../middleware/validateSchema';
import { registerSchema, loginSchema } from '../schemas/authSchema';

export function registerAuthRoutes(fastify: FastifyInstance, controller: AuthController): void {
  fastify.post(
    '/register',
    { preValidation: validateBody(registerSchema) },
    async (request, reply) => controller.register(request as never, reply),
  );

  fastify.post('/login', { preValidation: validateBody(loginSchema) }, async (request, reply) =>
    controller.login(request as never, reply),
  );
}
