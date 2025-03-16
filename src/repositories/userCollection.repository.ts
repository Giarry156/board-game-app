// Importing: Classes.
import { BoardGame } from "@prisma/client";
import Repository from "./repository";

// Defining interfaces.
interface AddBoardGameToUserCollectionData {
  boardGameId: number;
  userId: number;
}

interface RemoveBoardGameFromUserCollectionData {
  id: number;
}

interface IUserCollectionRepository {
  findUserCollection(id: number): Promise<BoardGame[]>;
  findUserCollectionByIdAndUserId(
    id: number,
    userId: number
  ): Promise<BoardGame | null>;
  findBoardGameInUserCollection(
    userId: number,
    boardGameId: number
  ): Promise<BoardGame | null>;
  addBoardGameToUserCollection(
    data: AddBoardGameToUserCollectionData
  ): Promise<BoardGame>;
  removeBoardGameFromUserCollection(
    data: RemoveBoardGameFromUserCollectionData
  ): Promise<BoardGame>;
}

// Defining repository.
export default class UserCollectionRepository
  extends Repository
  implements IUserCollectionRepository
{
  constructor() {
    super();
  }

  /**
   * Retrieves a list of all board games in the user's collection.
   * @returns A list of board games.
   */
  async findUserCollection(userId: number): Promise<BoardGame[]> {
    return (
      await this.db.userCollection.findMany({
        include: { boardGame: true },
        where: { userId: userId },
      })
    ).map((userCollection) => userCollection.boardGame);
  }

  /**
   * Retrieves a board game in the user's collection by its ID and the user's ID.
   * @param id The ID of the board game.
   * @param userId The ID of the user.
   * @returns The retrieved board game, or null if it does not exist.
   */
  async findUserCollectionByIdAndUserId(
    id: number,
    userId: number
  ): Promise<BoardGame | null> {
    return (
      (
        await this.db.userCollection.findFirst({
          include: { boardGame: true },
          where: { id, userId },
        })
      )?.boardGame || null
    );
  }

  /**
   * Retrieves a board game in the user's collection by its ID.
   * @param userId The ID of the user.
   * @param boardGameId The ID of the board game.
   * @returns The retrieved board game, or null if it does not exist.
   */
  async findBoardGameInUserCollection(
    userId: number,
    boardGameId: number
  ): Promise<BoardGame | null> {
    return (
      (
        await this.db.userCollection.findFirst({
          include: { boardGame: true },
          where: { userId, boardGameId },
        })
      )?.boardGame || null
    );
  }

  /**
   * Adds a board game to the user's collection.
   * @param data The data for adding a board game to the user's collection.
   * @returns The added board game.
   */
  async addBoardGameToUserCollection(
    data: AddBoardGameToUserCollectionData
  ): Promise<BoardGame> {
    return (
      await this.db.userCollection.create({
        include: { boardGame: true },
        data,
      })
    ).boardGame;
  }

  /**
   * Removes a board game from the user's collection by its ID.
   * @param data The data containing the ID of the board game to remove.
   * @returns The removed board game.
   */
  async removeBoardGameFromUserCollection({
    id,
  }: RemoveBoardGameFromUserCollectionData): Promise<BoardGame> {
    return (
      await this.db.userCollection.delete({
        include: { boardGame: true },
        where: { id },
      })
    ).boardGame;
  }
}
