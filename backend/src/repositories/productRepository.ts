import { PrismaClient } from '@prisma/client';

import { CreateProductInput, Product, UpdateProductInput } from '../types/product';
import { getPrismaClient } from '../utils/prismaClient';

export interface ProductRepository {
  create(data: CreateProductInput): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<void>;
}

type PrismaProduct = Awaited<ReturnType<PrismaClient['product']['create']>>;

function mapPrismaProduct(product: PrismaProduct): Product {
  return {
    ...product,
    imageUrl: product.imageUrl ?? null,
  };
}

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient = getPrismaClient()) {}

  async create(data: CreateProductInput): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        ...data,
        imageUrl: data.imageUrl ?? null,
      },
    });

    return mapPrismaProduct(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products.map(mapPrismaProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product ? mapPrismaProduct(product) : null;
  }

  async update(id: string, data: UpdateProductInput): Promise<Product> {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        imageUrl: data.imageUrl ?? null,
      },
    });

    return mapPrismaProduct(product);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
