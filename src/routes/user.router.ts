// Importing: Dependencies.
import { Router } from "express";

// Importing: Controllers.
import UserController from "../controllers/user.controller";

// Defining router.
const router = Router();

// Defining controllers.
const userController = new UserController();

// Defining routes.
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 */
router.post("/register", userController.register);

// Exporting router.
export default router;
