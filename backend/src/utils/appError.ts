export class ApplicationError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
    public readonly details?: string,
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, details?: string) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(code: string, message: string, details?: string) {
    super(code, message, 404, details);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends ApplicationError {
  constructor(code: string, message: string, details?: string) {
    super(code, message, 409, details);
    this.name = 'ConflictError';
  }
}

export class DatabaseError extends ApplicationError {
  constructor(message = 'Erro ao processar a operacao no banco de dados', details?: string) {
    super('DATABASE_ERROR', message, 500, details);
    this.name = 'DatabaseError';
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message = 'Não autorizado', details?: string) {
    super('UNAUTHORIZED', message, 401, details);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message = 'Acesso negado', details?: string) {
    super('FORBIDDEN', message, 403, details);
    this.name = 'ForbiddenError';
  }
}
