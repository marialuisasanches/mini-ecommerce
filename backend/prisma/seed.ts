import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => {
    console.error('✗ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
