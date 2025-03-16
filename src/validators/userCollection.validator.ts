// Importing: Dependencies.
import { z } from "zod";

// Defining validators.
const addBoardGameToUserCollectionValidator = z.object({
  boardGameId: z.number().int(),
});

const removeBoardGameFromUserCollectionValidator = z.object({
  boardGameId: z.number().int(),
});

export {
  addBoardGameToUserCollectionValidator,
  removeBoardGameFromUserCollectionValidator,
};
