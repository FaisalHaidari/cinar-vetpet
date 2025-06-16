const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9Uu', // hashed password
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Product 1',
        description: 'Description for product 1',
        price: 99.99,
        category: 'Category 1',
        stock: 100,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Product 2',
        description: 'Description for product 2',
        price: 149.99,
        category: 'Category 2',
        stock: 50,
      },
    }),
  ]);

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 