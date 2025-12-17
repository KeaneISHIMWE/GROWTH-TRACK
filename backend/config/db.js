const { PrismaClient } = require('@prisma/client');

// For Prisma 7+, we need to provide either adapter or accelerateUrl
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

module.exports = prisma;