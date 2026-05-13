import { FastifyReply, FastifyRequest } from 'fastify';

import { ProductService } from '../services/productService';
import { buildSuccessResponse } from '../utils/response';
import {
  CreateProductSchema,
  ProductIdParamsSchema,
  UpdateProductSchema,
} from '../schemas/productSchema';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async create(
    request: FastifyRequest<{ Body: CreateProductSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const product = await this.productService.createProduct(request.body);

    reply.code(201).send(buildSuccessResponse(product));
  }

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const products = await this.productService.listProducts();

    reply.code(200).send(buildSuccessResponse(products));
  }

  async getById(
    request: FastifyRequest<{ Params: ProductIdParamsSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const product = await this.productService.getProductById(id);

    reply.code(200).send(buildSuccessResponse(product));
  }

  async update(
    request: FastifyRequest<{ Params: ProductIdParamsSchema; Body: UpdateProductSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;
    const product = await this.productService.updateProduct(id, request.body);

    reply.code(200).send(buildSuccessResponse(product));
  }

  async delete(
    request: FastifyRequest<{ Params: ProductIdParamsSchema }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { id } = request.params;

    await this.productService.deleteProduct(id);

    reply.code(204).send();
  }
}
