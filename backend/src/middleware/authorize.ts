import { FastifyReply, FastifyRequest } from 'fastify';
import { ForbiddenError } from '../utils/appError';

export function authorize(allowedRoles: string[]) {
  return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    const user = (request as any).user;

    if (!user) {
      throw new ForbiddenError('FORBIDDEN', 'Acesso negado');
    }

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenError('FORBIDDEN', 'Permissao insuficiente');
    }
  };
}
