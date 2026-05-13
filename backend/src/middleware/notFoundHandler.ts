import { FastifyReply, FastifyRequest } from 'fastify';

export function notFoundHandler(_request: FastifyRequest, reply: FastifyReply): void {
  reply.status(404).send({
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'Rota nao encontrada',
    },
  });
}
