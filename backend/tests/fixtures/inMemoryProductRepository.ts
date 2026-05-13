import { randomUUID } from 'node:crypto';

import { CreateProductInput, Product, UpdateProductInput } from '../../src/types/product';
import { ProductRepository } from '../../src/repositories/productRepository';

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  async create(data: CreateProductInput): Promise<Product> {
    const product: Product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      imageUrl: data.imageUrl ?? null,
      createdAt: new Date(),
    };

    this.products.unshift(product);

    return product;
  }

  async findAll(): Promise<Product[]> {
    return [...this.products];
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) ?? null;
  }

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex < 0) {
      throw new Error('Product not found in memory repository');
    }

    const currentProduct = this.products[productIndex];
    const updatedProduct: Product = {
      ...currentProduct,
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      imageUrl: data.imageUrl ?? null,
    };

    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id);
  }

  clear(): void {
    this.products = [];
  }
}
