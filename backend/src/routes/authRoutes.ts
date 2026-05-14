import { FastifyInstance } from 'fastify';

import { AuthController } from '../controllers/authController';
import { validateBody } from '../middleware/validateSchema';
import { loginSchema } from '../schemas/authSchema';

export function registerAuthRoutes(fastify: FastifyInstance, controller: AuthController): void {
  // Registration endpoint removed - registration is disabled (admin-only)
  fastify.post('/login', { preValidation: validateBody(loginSchema) }, async (request, reply) =>
    controller.login(request as never, reply),
  );
}
