import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateUserSchema, UpdateUserSchema, UserIdParamsSchema } from '../schemas/userSchema';
import { UserService } from '../services/userService';
import { buildSuccessResponse } from '../utils/response';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(
    request: FastifyRequest<{ Body: CreateUserSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const user = await this.userService.createUser(request.body);

    reply.code(201).send(buildSuccessResponse(user));
  }

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const users = await this.userService.listUsers();

    reply.code(200).send(buildSuccessResponse(users));
  }

  async getById(
    request: FastifyRequest<{ Params: UserIdParamsSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const user = await this.userService.getUserById(id);

    reply.code(200).send(buildSuccessResponse(user));
  }

  async update(
    request: FastifyRequest<{ Params: UserIdParamsSchema; Body: UpdateUserSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const user = await this.userService.updateUser(id, request.body);

    reply.code(200).send(buildSuccessResponse(user));
  }

  async delete(
    request: FastifyRequest<{ Params: UserIdParamsSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;

    await this.userService.deleteUser(id);

    reply.code(204).send();
  }
}
