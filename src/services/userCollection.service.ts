// Importing: Dependencies.
import createHttpError from "http-errors";

// Importing: Repositories.
import UserCollectionRepository from "../repositories/userCollection.repository";
import BoardGameRepository from "../repositories/boardgame.repository";

export default class UserCollectionService {
  private userCollectionRepository: UserCollectionRepository =
    new UserCollectionRepository();
  private boardGameRepository: BoardGameRepository = new BoardGameRepository();

  constructor() {}

  /**
   * Retrieves a list of all board games in the user's collection.
   * @param userId The ID of the user.
   * @returns A list of board games.
   * @throws {HttpError} If the board game does not exist, a 404 error is thrown.
   */
  public async getUserCollection(userId: number) {
    // Retrieving the board game.
    const userCollection =
      await this.userCollectionRepository.findUserCollectionsByUserId(userId);

    // Throwing an error if the board game does not exist.
    if (!userCollection) {
      throw createHttpError(404, "Board game not found.");
    }

    // Returning the board game.
    return userCollection.map((userCollection) => userCollection.boardGame);
  }

  /**
   * Adds a board game to a user's collection.
   * @param data An object containing the user's ID and the board game id.
   * @returns The added board game in the user's collection.
   * @throws {HttpError} If the board game does not exist, a 404 error is thrown.
   */
  public async addBoardGameInUserCollection(data: {
    userId: number;
    boardGameId: number;
  }) {
    // Checking if the board game exists.
    const boardGame = await this.boardGameRepository.findBoardGameById(
      data.boardGameId
    );

    // Throwing an error if the board game does not exist.
    if (!boardGame) {
      throw createHttpError(404, "Board game not found.");
    }

    // Checking if the user already has the board game in its collection.
    const userCollection =
      await this.userCollectionRepository.findUserCollectionByUserIdAndBoardGameId(
        data.userId,
        boardGame.id
      );

    // Throwing an error if the user already has the board game in its collection.
    if (userCollection) {
      throw createHttpError(
        400,
        "Board game already exists in your collection."
      );
    }

    // Creating the board game.
    const operationData =
      await this.userCollectionRepository.addBoardGameToUserCollection({
        userId: data.userId,
        boardGameId: boardGame.id,
      });

    // Returning the board game.
    return operationData.boardGame;
  }

  /**
   * Removes a board game from a user's collection.
   * @param data An object containing the user's ID and the board game id.
   * @throws {HttpError} If the board game does not exist or if the user does not have the board game in their collection, a 404 error is thrown.
   * @returns The removed board game from the user's collection.
   */
  public async removeBoardGameFromUserCollection(data: {
    userId: number;
    boardGameId: number;
  }) {
    // Checking if the board game exists.
    const boardGame = await this.boardGameRepository.findBoardGameById(
      data.boardGameId
    );

    // Throwing an error if the board game does not exist.
    if (!boardGame) {
      throw createHttpError(404, "Board game not found.");
    }

    // Checking if the user has the board game in its collection.
    const userCollection =
      await this.userCollectionRepository.findUserCollectionByUserIdAndBoardGameId(
        data.userId,
        boardGame.id
      );

    // Throwing an error if the user does not have the board game in its collection.
    if (!userCollection) {
      throw createHttpError(404, "Board game not found in your collection.");
    }

    // Removing the board game from the user collection.
    const operationData =
      await this.userCollectionRepository.removeBoardGameFromUserCollection({
        id: userCollection.id,
      });

    // Returning the board game.
    return operationData.boardGame;
  }
}
