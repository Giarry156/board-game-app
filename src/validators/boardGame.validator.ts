// Importing: Dependencies.
import { z } from "zod";

// Defining validators.
const getBoardGameValidator = z.object({
  code: z.string().nonempty(),
});

const createBoardGameValidator = z.object({
  code: z.string().nonempty(),
  title: z.string().nonempty(),
  numberOfPlayers: z.number().min(1),
  duration: z.number().min(1),
  publisher: z.string().nonempty(),
});

const updateBoardGameValidator = z.object({
  code: z.string().nonempty().optional(),
  title: z.string().nonempty().optional(),
  numberOfPlayers: z.number().min(1).optional(),
  duration: z.number().min(1).optional(),
  publisher: z.string().nonempty().optional(),
});

export {
  getBoardGameValidator,
  createBoardGameValidator,
  updateBoardGameValidator,
};
