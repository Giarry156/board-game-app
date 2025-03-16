// Importing: Dependencies.
import { Router } from "express";

// Importing: Routers.
import userRouter from "./routes/user.router";
import boardGameRouter from "./routes/boardGame.router";
import userCollectionRouter from "./routes/userCollection.router";

// Defining router.
const router = Router();

// Defining routes.
router.use("/users", userRouter);
router.use("/board-games", boardGameRouter);
router.use("/collection", userCollectionRouter);

// Exporting router.
export default router;
