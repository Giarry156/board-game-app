// Importing: Dependencies.
import { z } from "zod";

// Defining validators.
const getBoardGameValidator = z.object({
  id: z.number().int(),
});

const createBoardGameValidator = z.object({
  code: z.string().nonempty(),
  title: z.string().nonempty(),
  numberOfPlayers: z.number().min(1),
  playTime: z.number().min(1),
  publisher: z.string().nonempty(),
});

const updateBoardGameValidator = z.object({
  id: z.number().int(),
  code: z.string().nonempty().optional(),
  title: z.string().nonempty().optional(),
  numberOfPlayers: z.number().min(1).optional(),
  playTime: z.number().min(1).optional(),
  publisher: z.string().nonempty().optional(),
});

const deleteBoardGameValidator = z.object({
  id: z.number().int(),
});

export {
  getBoardGameValidator,
  createBoardGameValidator,
  updateBoardGameValidator,
  deleteBoardGameValidator,
};
