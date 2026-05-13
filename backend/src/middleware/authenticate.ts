import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../utils/appError';

export async function authenticate(request: FastifyRequest, _reply: FastifyReply): Promise<void> {
  const authHeader = request.headers.authorization as string | undefined;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('UNAUTHORIZED', 'Token de autenticacao ausente');
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const secret = process.env.JWT_SECRET ?? 'secret';
    const payload = jwt.verify(token, secret) as any;

    // attach user information to request
    (request as any).user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  } catch (err) {
    throw new UnauthorizedError('UNAUTHORIZED', 'Token invalido');
  }
}
