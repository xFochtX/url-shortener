// This script allows you to remove the url and shortened url from the database

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    await prisma.link.deleteMany({});
    console.log('All data deleted successfully.');
  } catch (error) {
    console.error('Error during data deletion:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllData();
