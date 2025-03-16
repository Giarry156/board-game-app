// Importing: Dependencies.
import { User } from "@prisma/client";

// Overriding the Request interface.
declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}
