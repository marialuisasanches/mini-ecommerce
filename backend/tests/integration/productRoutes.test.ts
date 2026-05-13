import request from 'supertest';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { buildApp } from '../../src/app';
import { InMemoryProductRepository } from '../fixtures/inMemoryProductRepository';

describe('Product routes', () => {
  const repository = new InMemoryProductRepository();
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeEach(async () => {
    repository.clear();
    app = await buildApp({ productRepository: repository });
    await app.ready();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('creates a product and returns 201', async () => {
    const response = await request(app.server).post('/products').send({
      name: 'Teclado Mecânico',
      description: 'Switch blue',
      price: 349.9,
      stock: 8,
      category: 'Perifericos',
      imageUrl: 'https://example.com/keyboard.png',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe('Teclado Mecânico');
  });

  it('lists products', async () => {
    await request(app.server).post('/products').send({
      name: 'Monitor',
      description: '27 polegadas',
      price: 1299.9,
      stock: 5,
      category: 'Perifericos',
    });

    const response = await request(app.server).get('/products');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  it('updates a product', async () => {
    const createdResponse = await request(app.server).post('/products').send({
      name: 'Webcam',
      description: 'Full HD',
      price: 199.9,
      stock: 4,
      category: 'Perifericos',
    });

    const productId = createdResponse.body.data.id;

    const response = await request(app.server).put(`/products/${productId}`).send({
      name: 'Webcam Pro',
      description: 'Full HD 60fps',
      price: 249.9,
      stock: 6,
      category: 'Perifericos',
    });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('Webcam Pro');
  });

  it('deletes a product', async () => {
    const createdResponse = await request(app.server).post('/products').send({
      name: 'Headset',
      description: 'Surround',
      price: 299.9,
      stock: 3,
      category: 'Perifericos',
    });

    const productId = createdResponse.body.data.id;

    const response = await request(app.server).delete(`/products/${productId}`);

    expect(response.status).toBe(204);
  });
});
