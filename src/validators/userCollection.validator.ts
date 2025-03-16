// Importing: Dependencies.
import { z } from "zod";

// Defining validators.
const addBoardGameToUserCollectionValidator = z.object({
  boardGameCode: z.string().nonempty(),
});

const removeBoardGameFromUserCollectionValidator = z.object({
  boardGameCode: z.string().nonempty(),
});

export {
  addBoardGameToUserCollectionValidator,
  removeBoardGameFromUserCollectionValidator,
};
