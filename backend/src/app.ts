import cors from '@fastify/cors';
import fastify, { FastifyInstance } from 'fastify';

import { ProductController } from './controllers/productController';
import { UserController } from './controllers/userController';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { registerProductRoutes } from './routes/productRoutes';
import { registerUserRoutes } from './routes/userRoutes';
import { registerAuthRoutes } from './routes/authRoutes';
import { PrismaProductRepository, ProductRepository } from './repositories/productRepository';
import { PrismaUserRepository, UserRepository } from './repositories/userRepository';
import { createProductService } from './services/productService';
import { createUserService } from './services/userService';
import { createAuthService } from './services/authService';
import { createAuthController } from './controllers/authController';

type BuildAppOptions = {
  productRepository?: ProductRepository;
  userRepository?: UserRepository;
};

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = fastify({ logger: true });
  const productRepository = options.productRepository ?? new PrismaProductRepository();
  const userRepository = options.userRepository ?? new PrismaUserRepository();
  const productService = createProductService(productRepository);
  const productController = new ProductController(productService);
  const userService = createUserService(userRepository);
  const userController = new UserController(userService);
  const authService = createAuthService(userRepository);
  const authController = createAuthController(authService);

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

  app.register(
    (instance, _options, done) => {
      registerUserRoutes(instance, userController);
      done();
    },
    { prefix: '/users' },
  );

  app.register(
    (instance, _options, done) => {
      registerUserRoutes(instance, userController);
      done();
    },
    { prefix: '/api/v1/users' },
  );

  app.register(
    (instance, _options, done) => {
      registerAuthRoutes(instance, authController);
      done();
    },
    { prefix: '/api/v1/auth' },
  );

  return app;
}
