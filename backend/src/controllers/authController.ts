import { FastifyReply, FastifyRequest } from 'fastify';

import { AuthService } from '../services/authService';
import { registerSchema, loginSchema } from '../schemas/authSchema';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = registerSchema.parse(request.body);

    const { user, token } = await this.authService.register(body as any);

    reply.status(201).send({ success: true, data: { user, token } });
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = loginSchema.parse(request.body);

    const { user, token } = await this.authService.login(body.email, body.password);

    reply.status(200).send({ success: true, data: { user, token } });
  }
}

export function createAuthController(authService: AuthService): AuthController {
  return new AuthController(authService);
}
