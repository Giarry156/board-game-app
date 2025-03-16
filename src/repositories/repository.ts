// Importing: Dependencies.
import { PrismaClient } from "@prisma/client";

// Importing: Configs.
import prisma from "../config/db";

// Defining generic repository class.
export default abstract class Repository {
    constructor(protected readonly db: PrismaClient = prisma) {}
}