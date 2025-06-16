const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Prisma connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting Prisma to MongoDB:', error);
  }
}

testConnection(); // Run test on startup

module.exports = prisma; // Export the prisma client instance 