// This script allows you to generate a json file where the urls and shortened urls will be saved

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function backupData() {
  try {
    const links = await prisma.link.findMany();
    fs.writeFileSync('backup.json', JSON.stringify(links, null, 2));
    console.log('Backup completed successfully.');
  } catch (error) {
    console.error('Error during backup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

backupData();