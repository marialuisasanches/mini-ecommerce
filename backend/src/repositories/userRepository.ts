import { PrismaClient } from '@prisma/client';

import { CreateUserInput, UpdateUserInput, User, UserRole } from '../types/user';
import { getPrismaClient } from '../utils/prismaClient';

export interface UserRepository {
  create(data: CreateUserInput): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: UpdateUserInput): Promise<User>;
  delete(id: string): Promise<void>;
}

type PrismaUser = Awaited<ReturnType<PrismaClient['user']['create']>>;

function mapPrismaUser(user: PrismaUser): User {
  return {
    ...user,
    role: user.role as UserRole,
  };
}

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient = getPrismaClient()) {}

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data,
    });

    return mapPrismaUser(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users.map(mapPrismaUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? mapPrismaUser(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? mapPrismaUser(user) : null;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    return mapPrismaUser(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
