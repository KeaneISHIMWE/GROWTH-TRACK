import { PrismaClient } from '@prisma/client';

// Single Prisma client instance for the app
export const prisma = new PrismaClient();

