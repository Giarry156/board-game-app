// Importing: Dependencies.
import { NextFunction, Request, Response } from "express";

// Importing: Services.
import boardGameService from "../services/boardGame.service";
import {
  createBoardGameValidator,
  deleteBoardGameValidator,
  getBoardGameValidator,
  updateBoardGameValidator,
} from "../validators/boardGame.validator";

export default class boardGameController {
  private boardGameService = new boardGameService();

  constructor() {}

  public getBoardGamesList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Retrieving the list of board games.
      const data = await this.boardGameService.getBoardGamesList();

      // Returning the list.
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public getBoardGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validating the request params.
      getBoardGameValidator.parse({ id: Number(req.params.id) });

      // Retrieving the board game.
      const data = await this.boardGameService.getBoardGame(
        Number(req.params.id)
      );

      // Returning the board game.
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public createBoardGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validating the request body.
      createBoardGameValidator.parse(req.body);

      // Deconstructuring the request body.
      const { code, title, numberOfPlayers, playTime, publisher } = req.body;

      // Creating a new board game.
      const data = await this.boardGameService.createBoardGame({
        code,
        title,
        numberOfPlayers,
        playTime,
        publisher,
      });

      // Returning the board game.
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public updateBoardGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validating the request body.
      updateBoardGameValidator.parse({
        id: Number(req.params.id),
        ...req.body,
      });

      // Deconstructuring the request body.
      const { code, title, numberOfPlayers, playTime, publisher } = req.body;

      // Updating the board game.
      const data = await this.boardGameService.updateBoardGame(
        Number(req.params.id),
        {
          code,
          title,
          numberOfPlayers,
          playTime,
          publisher,
        }
      );

      // Returning the board game.
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  public deleteBoardGame = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validating the request params.
      deleteBoardGameValidator.parse({ id: Number(req.params.id) });

      // Deleting the board game.
      const data = await this.boardGameService.deleteBoardGame(
        Number(req.params.id)
      );

      // Returning the board game.
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}
