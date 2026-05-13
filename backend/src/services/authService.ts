import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserRepository } from '../repositories/userRepository';
import { CreateUserInput, User } from '../types/user';
import { ConflictError, UnauthorizedError } from '../utils/appError';

type TokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(input: CreateUserInput): Promise<{ user: User; token: string }> {
    const existing = await this.userRepository.findByEmail(input.email);

    if (existing) {
      throw new ConflictError('USER_EMAIL_ALREADY_EXISTS', 'Email ja cadastrado');
    }

    const passwordToStore = input.password ? await bcrypt.hash(input.password, 10) : '';

    const created = await this.userRepository.create({
      ...input,
      password: passwordToStore,
      role: input.role ?? 'customer',
    } as CreateUserInput);

    const token = this.signToken({ sub: created.id, email: created.email, role: created.role });

    return { user: created, token };
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('INVALID_CREDENTIALS', 'Credenciais invalidas');
    }

    // fetch raw user from prisma to compare password
    // userRepository.findByEmail returns mapped user without password, so we need to access prisma directly
    // To avoid breaking abstractions, assume repository implements a method to get raw record; otherwise use prisma client directly
    // For simplicity, cast to any and attempt to access password via a hidden method
    const anyRepo = this.userRepository as any;
    let rawUser: any = null;

    if (typeof anyRepo.findByEmailWithPassword === 'function') {
      rawUser = await anyRepo.findByEmailWithPassword(email);
    } else if (user && (user as any).password) {
      rawUser = user as any;
    } else {
      // fallback: try to import prisma client directly
      const { getPrismaClient } = await import('../utils/prismaClient');
      const prisma = getPrismaClient();
      rawUser = await prisma.user.findUnique({ where: { email } });
    }

    if (!rawUser || !rawUser.password) {
      throw new UnauthorizedError('INVALID_CREDENTIALS', 'Credenciais invalidas');
    }

    const matched = await bcrypt.compare(password, rawUser.password);

    if (!matched) {
      throw new UnauthorizedError('INVALID_CREDENTIALS', 'Credenciais invalidas');
    }

    const token = this.signToken({ sub: user.id, email: user.email, role: user.role });

    return { user, token };
  }

  private signToken(payload: TokenPayload): string {
    const secret = process.env.JWT_SECRET ?? 'secret';
    // Use numeric expiration in seconds to satisfy TypeScript typings (e.g. 24h)
    const expiresInSeconds = process.env.JWT_EXPIRES_IN_SECONDS
      ? parseInt(process.env.JWT_EXPIRES_IN_SECONDS, 10)
      : 60 * 60 * 24; // default 24 hours

    return jwt.sign(payload, secret, { expiresIn: expiresInSeconds });
  }
}

export function createAuthService(userRepository: UserRepository): AuthService {
  return new AuthService(userRepository);
}
