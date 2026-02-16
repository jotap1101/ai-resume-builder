import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../../generated/prisma/client";

let connectionString = `${process.env.DATABASE_URL}`;

// Replace problematic SSL modes to avoid deprecation warnings
if (connectionString) {
  // Remove problematic sslmode values (prefer, require, verify-ca)
  connectionString = connectionString.replace(
    /([?&])sslmode=(prefer|require|verify-ca)(&|$)/gi,
    "$1sslmode=verify-full$3",
  );

  // Add sslmode if not present
  if (!connectionString.includes("sslmode=")) {
    const separator = connectionString.includes("?") ? "&" : "?";
    connectionString += `${separator}sslmode=verify-full`;
  }
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
