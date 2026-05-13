import { ConflictError, NotFoundError } from '../utils/appError';
import { UserRepository } from '../repositories/userRepository';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema';
import { CreateUserInput, UpdateUserInput, User } from '../types/user';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(input: CreateUserInput): Promise<User> {
    const parsedInput = createUserSchema.parse(input);
    const existingUser = await this.userRepository.findByEmail(parsedInput.email);

    if (existingUser) {
      throw new ConflictError(
        'USER_EMAIL_ALREADY_EXISTS',
        'Email ja cadastrado',
        'Ja existe um usuario com o email informado',
      );
    }

    return this.userRepository.create(parsedInput);
  }

  async listUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError(
        'USER_NOT_FOUND',
        'Usuario nao encontrado',
        'Nenhum usuario encontrado com o ID informado',
      );
    }

    return user;
  }

  async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    const parsedInput = updateUserSchema.parse(input);
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundError(
        'USER_NOT_FOUND',
        'Usuario nao encontrado',
        'Nao foi possivel atualizar um usuario inexistente',
      );
    }

    const userWithSameEmail = await this.userRepository.findByEmail(parsedInput.email);

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new ConflictError(
        'USER_EMAIL_ALREADY_EXISTS',
        'Email ja cadastrado',
        'Ja existe um usuario com o email informado',
      );
    }

    return this.userRepository.update(id, parsedInput);
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new NotFoundError(
        'USER_NOT_FOUND',
        'Usuario nao encontrado',
        'Nao foi possivel remover um usuario inexistente',
      );
    }

    await this.userRepository.delete(id);
  }
}

export function createUserService(userRepository: UserRepository): UserService {
  return new UserService(userRepository);
}
