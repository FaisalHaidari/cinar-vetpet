import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma connected to SQLite successfully');
  } catch (error) {
    console.error('Error connecting Prisma to SQLite:', error);
  }
}

testConnection(); // Run test on startup

export default prisma; // Export the prisma client instance 