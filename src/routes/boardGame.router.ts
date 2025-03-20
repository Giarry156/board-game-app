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
/**
 * @swagger
 * /api/board-games:
 *   get:
 *     summary: Get board games list
 *     tags: [Board Games]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Board games list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BoardGame'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Board games not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
boardGameRouter.get("/", authUser(), boardGameController.getBoardGamesList);

/**
 * @swagger
 * /api/board-games:
 *   post:
 *     summary: Create a new board game
 *     tags: [Board Games]
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               numberOfPlayers:
 *                 type: number
 *               playTime:
 *                 type: number
 *               publisher:
 *                 type: string
 *     responses:
 *       201:
 *         description: Board game successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardGame'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Board game already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
boardGameRouter.post("/", authUser(), boardGameController.createBoardGame);

/**
 * @swagger
 * /api/board-games/{id}:
 *   get:
 *     summary: Get board game by id
 *     tags: [Board Games]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Board game id
 *     responses:
 *       200:
 *         description: Board game retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardGame'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Board game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
boardGameRouter.get("/:id", authUser(), boardGameController.getBoardGame);

/**
 * @swagger
 * /api/board-games/{id}:
 *   patch:
 *     summary: Update board game by id
 *     tags: [Board Games]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Board game id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               numberOfPlayers:
 *                 type: number
 *               playTime:
 *                 type: number
 *               publisher:
 *                 type: string
 *       responses:
 *         200:
 *           description: Board game successfully updated
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         404:
 *           description: Board game not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         409:
 *           description: Board game already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 */
boardGameRouter.patch("/:id", authUser(), boardGameController.updateBoardGame);

/**
 * @swagger
 * /api/board-games/{id}:
 *   delete:
 *     summary: Delete board game by id
 *     tags: [Board Games]
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Board game id
 *     responses:
 *       200:
 *         description: Board game successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BoardGame'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Board game not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
boardGameRouter.delete("/:id", authUser(), boardGameController.deleteBoardGame);

// Exporting router.
export default boardGameRouter;
