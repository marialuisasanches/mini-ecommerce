import { describe, expect, it } from 'vitest';

import { InMemoryProductRepository } from '../fixtures/inMemoryProductRepository';
import { ProductService } from '../../src/services/productService';

describe('ProductService', () => {
  it('creates a product with valid data', async () => {
    const repository = new InMemoryProductRepository();
    const service = new ProductService(repository);

    const product = await service.createProduct({
      name: 'Notebook Gamer',
      description: 'RTX 4060',
      price: 4999.9,
      stock: 10,
      category: 'Eletronicos',
      imageUrl: 'https://example.com/image.png',
    });

    expect(product.id).toBeTruthy();
    expect(product.name).toBe('Notebook Gamer');
  });

  it('rejects product with invalid price', async () => {
    const repository = new InMemoryProductRepository();
    const service = new ProductService(repository);

    await expect(
      service.createProduct({
        name: 'Mouse',
        description: 'Mouse gamer',
        price: 0,
        stock: 1,
        category: 'Acessorios',
      }),
    ).rejects.toThrow('Preco deve ser maior que zero');
  });

  it('throws when product does not exist', async () => {
    const repository = new InMemoryProductRepository();
    const service = new ProductService(repository);

    await expect(service.getProductById('550e8400-e29b-41d4-a716-446655440000')).rejects.toThrow(
      'Produto nao encontrado',
    );
  });
});
