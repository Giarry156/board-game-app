// Importing: Dependencies.
import { PrismaClient } from "@prisma/client";

// Instantiating database connection.
const prisma = new PrismaClient();

// Exporting singleton.
export default prisma;
