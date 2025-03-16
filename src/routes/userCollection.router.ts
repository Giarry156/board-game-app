// Importing: Dependencies.
import { Router } from "express";

// Importing: Controllers.
import UserCollectionController from "../controllers/userCollection.controller";
import authUser from "../middlewares/authUser.middleware";

// Defining controllers.
const userCollectionController = new UserCollectionController();

// Defining router.
const userCollectionRouter = Router();

// Defining routes.

userCollectionRouter.get(
  "/",
  authUser(),
  userCollectionController.getUserCollection
);

userCollectionRouter.post(
  "/",
  authUser(),
  userCollectionController.addBoardGameInUserCollection
);
userCollectionRouter.delete(
  "/",
  authUser(),
  userCollectionController.removeBoardGameInUserCollection
);

// Exporting router.
export default userCollectionRouter;
