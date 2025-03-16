// Importing: Dependencies.
import { Router } from "express";

// Importing: Controllers.
import BoardGameController from "../controllers/boardGame.controller";
import authUser from "../middlewares/authUser.middleware";

// Defining controllers.
const boardGameController = new BoardGameController();

// Defining router.
const boardGameRouter = Router();

// Defining routes.
boardGameRouter.get("/", authUser(), boardGameController.getBoardGamesList);
boardGameRouter.post("/", authUser(), boardGameController.createBoardGame);
boardGameRouter.get("/:code", authUser(), boardGameController.getBoardGame);
boardGameRouter.patch(
  "/:code",
  authUser(),
  boardGameController.updateBoardGame
);
boardGameRouter.delete(
  "/:code",
  authUser(),
  boardGameController.deleteBoardGame
);

// Exporting router.
export default boardGameRouter;
