import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { ApplicationError } from '../utils/appError';

type ErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: string;
  };
};

function buildErrorResponse(code: string, message: string, details?: string): ErrorResponse {
  return {
    error: {
      code,
      message,
      details,
    },
  };
}

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  request.log.error({ err: error }, 'Unexpected error');

  if (error instanceof ApplicationError) {
    reply
      .status(error.statusCode)
      .send(buildErrorResponse(error.code, error.message, error.details));
    return;
  }

  if (error instanceof ZodError) {
    reply
      .status(400)
      .send(
        buildErrorResponse(
          'VALIDATION_ERROR',
          'Dados invalidos',
          error.issues.map((issue) => issue.message).join('; '),
        ),
      );
    return;
  }

  reply.status(500).send(buildErrorResponse('INTERNAL_SERVER_ERROR', 'Erro interno do servidor'));
}
