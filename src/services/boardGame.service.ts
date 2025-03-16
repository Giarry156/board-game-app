// Importing: Dependencies.
import { createHash } from "crypto";

// Importing: Repositories.
import BoardGameRepository from "../repositories/boardgame.repository";
import createHttpError from "http-errors";

export default class BoardGameService {
  private boardGameRepository: BoardGameRepository = new BoardGameRepository();

  /**
   * Retrieves a list of all board games.
   * @returns A list of board games.
   */
  public async getBoardGamesList() {
    // Retrieving the list of board games.
    return await this.boardGameRepository.getBoardGamesList();
  }

  /**
   * Retrieves a board game by its id.
   * @param id The id of the board game to retrieve.
   * @returns The retrieved board game, or null if it does not exist.
   * @throws {HttpError} If the board game does not exist, a 404 error is thrown.
   */
  public async getBoardGame(id: number) {
    // Retrieving the board game.
    const boardGame = await this.boardGameRepository.findBoardGameById(id);

    // Throwing an error if the board game does not exist.
    if (!boardGame) {
      throw createHttpError(404, "Board game not found.");
    }

    // Returning the board game.
    return boardGame;
  }

  /**
   * Creates a new board game.
   * @param data The data for creating a new board game.
   * @returns The created board game.
   */
  public async createBoardGame(data: {
    code: string;
    title: string;
    numberOfPlayers: number;
    playTime: number;
    publisher: string;
  }) {
    // Checking if there is a boardgame with the same code.
    const boardGameWithSameCode =
      await this.boardGameRepository.findBoardGameByCode(data.code);

    if (boardGameWithSameCode) {
      throw createHttpError(
        409,
        "Board game with the same code already exists."
      );
    }

    // Creating the board game.
    return await this.boardGameRepository.createBoardGame(data);
  }

  public async updateBoardGame(
    id: number,
    data: {
      code?: string;
      title?: string;
      numberOfPlayers?: number;
      playTime?: number;
      publisher?: string;
    }
  ) {
    // Retrieving board game.
    const boardGame = await this.getBoardGame(id);

    // Checking if there is a boardgame with the same code if the code is being updated.
    if (data.code) {
      const boardGameWithSameCode =
        await this.boardGameRepository.findBoardGameByCode(data.code);

      if (boardGameWithSameCode) {
        throw createHttpError(
          409,
          "Board game with the same code already exists."
        );
      }
    }

    // Updating the board game.
    return await this.boardGameRepository.updateBoardGame(boardGame.id, data);
  }

  public async deleteBoardGame(id: number) {
    // Retrieving board game.
    const boardGame = await this.getBoardGame(id);

    // Deleting the board game.
    return await this.boardGameRepository.deleteBoardGame(boardGame.id);
  }
}
