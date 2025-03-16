// Importing: Dependencies.
import { NextFunction, Request, Response } from "express";

// Importing: Services.
import UserCollectionService from "../services/userCollection.service";

// Importing: Validators.
import {
  addBoardGameToUserCollectionValidator,
  removeBoardGameFromUserCollectionValidator,
} from "../validators/userCollection.validator";

export default class userCollectionController {
  private userCollectionService = new UserCollectionService();

  constructor() {}

  public getUserCollection = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Retrieving the board game.
      const data = await this.userCollectionService.getUserCollection(
        req.user?.id as number
      );

      // Returning the board game.
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public addBoardGameInUserCollection = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validating the request body.
      addBoardGameToUserCollectionValidator.parse(req.body);

      // Deconstructuring the request body.
      const { boardGameId } = req.body;

      // Creating a new board game.
      const data =
        await this.userCollectionService.addBoardGameInUserCollection({
          userId: req.user?.id as number,
          boardGameId,
        });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public removeBoardGameInUserCollection = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validating the request body.
      removeBoardGameFromUserCollectionValidator.parse(req.body);

      // Deconstructuring the request body.
      const { boardGameId } = req.body;

      // Creating a new board game.
      const data =
        await this.userCollectionService.removeBoardGameFromUserCollection({
          userId: req.user?.id as number,
          boardGameId,
        });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
