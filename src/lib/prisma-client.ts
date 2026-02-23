import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import env from "@/config/env";

const pool = new PrismaPg({ connectionString: env.DATABASE_URL });

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: pool });

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
