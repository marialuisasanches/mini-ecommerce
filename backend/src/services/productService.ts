import { CreateProductInput, Product, UpdateProductInput } from '../types/product';
import { NotFoundError } from '../utils/appError';
import { ProductRepository } from '../repositories/productRepository';
import { createProductSchema, updateProductSchema } from '../schemas/productSchema';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(input: CreateProductInput): Promise<Product> {
    const parsedInput = createProductSchema.parse(input);

    return this.productRepository.create(parsedInput);
  }

  async listProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError(
        'PRODUCT_NOT_FOUND',
        'Produto nao encontrado',
        'Nenhum produto encontrado com o ID informado',
      );
    }

    return product;
  }

  async updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
    const parsedInput = updateProductSchema.parse(input);
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundError(
        'PRODUCT_NOT_FOUND',
        'Produto nao encontrado',
        'Nao foi possivel atualizar um produto inexistente',
      );
    }

    return this.productRepository.update(id, parsedInput);
  }

  async deleteProduct(id: string): Promise<void> {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundError(
        'PRODUCT_NOT_FOUND',
        'Produto nao encontrado',
        'Nao foi possivel remover um produto inexistente',
      );
    }

    await this.productRepository.delete(id);
  }
}

export function createProductService(productRepository: ProductRepository): ProductService {
  return new ProductService(productRepository);
}
