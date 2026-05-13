import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { buildApp } from '../../src/app';
import { InMemoryUserRepository } from '../fixtures/inMemoryUserRepository';

describe('User routes', () => {
  const repository = new InMemoryUserRepository();
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeEach(async () => {
    repository.clear();
    app = await buildApp({ userRepository: repository });
    await app.ready();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('creates a user and returns 201', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('maria@example.com');
  });

  it('lists users', async () => {
    await request(app.server).post('/users').send({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    const response = await request(app.server).get('/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  it('updates a user', async () => {
    const createdResponse = await request(app.server).post('/users').send({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    const userId = createdResponse.body.data.id;

    const response = await request(app.server).put(`/users/${userId}`).send({
      name: 'Maria Silva Costa',
      email: 'maria.costa@example.com',
      role: 'admin',
    });

    expect(response.status).toBe(200);
    expect(response.body.data.role).toBe('admin');
  });

  it('rejects duplicate email', async () => {
    await request(app.server).post('/users').send({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    const response = await request(app.server).post('/users').send({
      name: 'Maria Souza',
      email: 'maria@example.com',
      role: 'admin',
    });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe('USER_EMAIL_ALREADY_EXISTS');
  });

  it('deletes a user', async () => {
    const createdResponse = await request(app.server).post('/users').send({
      name: 'Maria Silva',
      email: 'maria@example.com',
      role: 'customer',
    });

    const userId = createdResponse.body.data.id;

    const response = await request(app.server).delete(`/users/${userId}`);

    expect(response.status).toBe(204);
  });
});
