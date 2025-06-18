import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding started...');

  // Clear existing data (optional, useful for clean re-seeding)
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.address.deleteMany({});

  // Create Admin User
  const hashedPassword = await bcrypt.hash('adminpassword', 10); // Hash password
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '1234567890',
      avatar: 'https://example.com/admin-avatar.jpg',
    },
  });
  console.log(`Created admin user: ${adminUser.email} (ID: ${adminUser.id})`);

  // Create some regular users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'USER',
      phone: '0987654321',
      avatar: 'https://example.com/john-avatar.jpg',
    },
  });
  console.log(`Created user: ${user1.email} (ID: ${user1.id})`);

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: await bcrypt.hash('securepass', 10),
      role: 'USER',
      phone: '1122334455',
      avatar: 'https://example.com/jane-avatar.jpg',
    },
  });
  console.log(`Created user: ${user2.email} (ID: ${user2.id})`);

  // Create Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Smartphone X',
        description: 'Latest smartphone with amazing features.',
        price: 999.99,
        image: 'https://example.com/smartphone.jpg',
        category: 'Electronics',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals.',
        price: 1499.00,
        image: 'https://example.com/laptop.jpg',
        category: 'Electronics',
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Great Gatsby',
        description: 'A classic novel by F. Scott Fitzgerald.',
        price: 12.50,
        image: 'https://example.com/gatsby.jpg',
        category: 'Books',
      },
    }),
    prisma.product.create({
      data: {
        name: 'T-Shirt Casual',
        description: 'Comfortable cotton t-shirt.',
        price: 25.00,
        image: 'https://example.com/tshirt.jpg',
        category: 'Clothing',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Blender 2000',
        description: 'Powerful blender for smoothies.',
        price: 75.99,
        image: 'https://example.com/blender.jpg',
        category: 'Home & Kitchen',
      },
    }),
  ]);
  console.log(`Created ${products.length} products.`);

  // Create Addresses
  const address1 = await prisma.address.create({
    data: {
      userId: user1.id,
      street: '123 Main St',
      buildingNo: '10',
      floor: '2',
      apartmentNo: '5',
      city: 'Anytown',
      state: 'CA',
      postalCode: '90210',
      zipCode: '90210',
      country: 'USA',
      phoneNumber: '123-456-7890',
      isDefault: true,
    },
  });
  console.log(`Created address for ${user1.name} (ID: ${address1.id})`);

  const address2 = await prisma.address.create({
    data: {
      userId: user2.id,
      street: '456 Oak Ave',
      buildingNo: 'B',
      floor: '5',
      apartmentNo: '12',
      city: 'Otherville',
      state: 'NY',
      postalCode: '10001',
      zipCode: '10001',
      country: 'USA',
      phoneNumber: '098-765-4321',
      isDefault: true,
    },
  });
  console.log(`Created address for ${user2.name} (ID: ${address2.id})`);

  // Create CartItems for user1
  await prisma.cartItem.create({
    data: {
      userId: user1.id,
      productId: products[0].id, // Smartphone X
      quantity: 1,
    },
  });
  await prisma.cartItem.create({
    data: {
      userId: user1.id,
      productId: products[2].id, // The Great Gatsby
      quantity: 2,
    },
  });
  console.log(`Created cart items for ${user1.name}`);

  // Create an Order for user1
  const order1 = await prisma.order.create({
    data: {
      userId: user1.id,
      addressId: address1.id,
      status: 'PENDING',
      totalAmount: products[0].price * 1 + products[1].price * 1, // Smartphone + Laptop
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: products[0].price,
          },
          {
            productId: products[1].id,
            quantity: 1,
            price: products[1].price,
          },
        ],
      },
    },
  });
  console.log(`Created order for ${user1.name} (Order ID: ${order1.id})`);

  // Create another Order for user2
  const order2 = await prisma.order.create({
    data: {
      userId: user2.id,
      addressId: address2.id,
      status: 'DELIVERED',
      totalAmount: products[3].price * 1 + products[4].price * 2, // T-Shirt + Blender * 2
      items: {
        create: [
          {
            productId: products[3].id,
            quantity: 1,
            price: products[3].price,
          },
          {
            productId: products[4].id,
            quantity: 2,
            price: products[4].price,
          },
        ],
      },
    },
  });
  console.log(`Created order for ${user2.name} (Order ID: ${order2.id})`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });