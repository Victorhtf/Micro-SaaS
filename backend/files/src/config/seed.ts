import prismaClient from '../utils/PrismaClient';

// Password: Password

async function main() {
  console.log('[SEED] Starting seed');
  // Generate users test
  const adminRole = await prismaClient.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'Administrator with full access',
      permissions: ['create', 'read', 'update', 'delete'],
    },
  });

  const editorRole = await prismaClient.role.upsert({
    where: { name: 'editor' },
    update: {},
    create: {
      name: 'editor',
      description: 'Editor with limited access',
      permissions: ['read', 'update'],
    },
  });

  // Generates test user
  await prismaClient.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      name: 'Name',
      lastName: 'Lastname',
      username: 'Username',
      password: '$2a$12$KQIfVJvi8OK78LSk3eBIiOQs.hXZQDk17qQVI6NzxSwcIRZW4Azq.',
      roles: ['admin'],
      company: 'SomeCompany',
      email: 'test@example.com',
      isActive: true,
    },
  });

  console.log('[SEED] Finished seed');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
