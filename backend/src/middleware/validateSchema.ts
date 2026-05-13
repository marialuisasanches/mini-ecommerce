import { FastifyReply, FastifyRequest, preValidationHookHandler } from 'fastify';
import { ZodSchema } from 'zod';

import { ValidationError } from '../utils/appError';

export function validateBody<T>(schema: ZodSchema<T>): preValidationHookHandler {
  return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    try {
      request.body = schema.parse(request.body) as never;
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError('Dados invalidos', error.message);
      }

      throw error;
    }
  };
}

export function validateParams<T>(schema: ZodSchema<T>): preValidationHookHandler {
  return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    try {
      request.params = schema.parse(request.params) as never;
    } catch (error) {
      if (error instanceof Error) {
        throw new ValidationError('Parametros invalidos', error.message);
      }

      throw error;
    }
  };
}
