import { describe, expect, it } from 'vitest';

import { InMemoryUserRepository } from '../fixtures/inMemoryUserRepository';
import { UserService } from '../../src/services/userService';

describe('UserService', () => {
  it('creates a user with valid data', async () => {
    const repository = new InMemoryUserRepository();
    const service = new UserService(repository);

    const user = await service.createUser({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    expect(user.id).toBeTruthy();
    expect(user.email).toBe('maria@example.com');
  });

  it('rejects duplicate email', async () => {
    const repository = new InMemoryUserRepository();
    const service = new UserService(repository);

    await service.createUser({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    await expect(
      service.createUser({
        name: 'Maria Souza',
        email: 'maria@example.com',
        role: 'admin',
      }),
    ).rejects.toThrow('Email ja cadastrado');
  });

  it('throws when user does not exist', async () => {
    const repository = new InMemoryUserRepository();
    const service = new UserService(repository);

    await expect(service.getUserById('550e8400-e29b-41d4-a716-446655440000')).rejects.toThrow(
      'Usuario nao encontrado',
    );
  });

  it('updates a user', async () => {
    const repository = new InMemoryUserRepository();
    const service = new UserService(repository);

    const createdUser = await service.createUser({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    const updatedUser = await service.updateUser(createdUser.id, {
      name: 'Maria Silva Costa',
      email: 'maria.costa@example.com',
      role: 'admin',
    });

    expect(updatedUser.name).toBe('Maria Silva Costa');
    expect(updatedUser.role).toBe('admin');
  });
});
