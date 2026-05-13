import { randomUUID } from 'node:crypto';

import { CreateUserInput, UpdateUserInput, User } from '../../src/types/user';
import { UserRepository } from '../../src/repositories/userRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(data: CreateUserInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: new Date(),
    };

    this.users.unshift(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      throw new Error('User not found in memory repository');
    }

    const currentUser = this.users[userIndex];
    const updatedUser: User = {
      ...currentUser,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  clear(): void {
    this.users = [];
  }
}
