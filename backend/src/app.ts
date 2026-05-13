import cors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';

import { ProductController } from './controllers/productController';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { registerProductRoutes } from './routes/productRoutes';
import { PrismaProductRepository, ProductRepository } from './repositories/productRepository';
import { createProductService } from './services/productService';

type BuildAppOptions = {
  productRepository?: ProductRepository;
};

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = fastify({ logger: true });
  const productRepository = options.productRepository ?? new PrismaProductRepository();
  const productService = createProductService(productRepository);
  const productController = new ProductController(productService);

  app.register(cors, {
    origin: true,
  });

  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  app.register(
    (instance, _options, done) => {
      registerProductRoutes(instance, productController);
      done();
    },
    { prefix: '/products' },
  );

  app.register(
    (instance, _options, done) => {
      registerProductRoutes(instance, productController);
      done();
    },
    { prefix: '/api/v1/products' },
  );

  return app;
}
