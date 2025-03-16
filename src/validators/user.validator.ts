// Importing: Dependencies.
import { z } from "zod";

// Defining validators.
const loginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

const registerValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

// Exporting validators.
export { loginValidator, registerValidator };
