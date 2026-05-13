import { buildApp } from './app';
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();
const port = Number(process.env.PORT ?? 3001);
const host = '0.0.0.0';

async function seedAdminUser(): Promise<void> {
  try {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin123';

    // Verifica se admin já existe
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('✓ Admin user already exists');
      return;
    }

    // Hash da senha
    const hashedPassword = await bcryptjs.hash(adminPassword, 10);

    // Cria o admin
    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        ativo: true,
      },
    });

    console.log('✓ Admin user created successfully');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Name: ${admin.name}`);
    console.log(`  Role: ${admin.role}`);
  } catch (error) {
    console.error('✗ Seed error:', error);
    throw error;
  }
}

async function startServer(): Promise<void> {
  try {
    // Executa o seed antes de iniciar o servidor
    console.log('🔄 Ensuring admin user exists...');
    await seedAdminUser();

    const app = await buildApp();

    await app.listen({ port, host });
  } catch (error) {
    console.error('✗ Server startup error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void startServer();
