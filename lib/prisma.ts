import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })

// Handle connection issues
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((e) => {
    console.error('Failed to connect to the database', e)
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma 