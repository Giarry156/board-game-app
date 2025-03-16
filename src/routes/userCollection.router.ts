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
/**
 * @swagger
 * /api/collection:
 *   get:
 *     summary: Get user collection
 *     tags: [Collection]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: User collection retrieved
 *       401:
 *         description: Unauthorized
 */
userCollectionRouter.get(
  "/",
  authUser(),
  userCollectionController.getUserCollection
);

/**
 * @swagger
 * /api/collection:
 *   post:
 *     summary: Add board game to user collection
 *     tags: [Collection]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardGameId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Board game added to user collection
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board game not found
 *       409:
 *         description: Board game already in user collection
 *       500:
 *         description: Internal server error
 */
userCollectionRouter.post(
  "/",
  authUser(),
  userCollectionController.addBoardGameInUserCollection
);

/**
 * @swagger
 * /api/collection:
 *   delete:
 *     summary: Remove board game from user collection
 *     tags: [Collection]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               boardGameId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Board game removed from user collection
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Board game not found
 *       500:
 *         description: Internal server error
 */
userCollectionRouter.delete(
  "/",
  authUser(),
  userCollectionController.removeBoardGameInUserCollection
);

// Exporting router.
export default userCollectionRouter;
