// Importing: Classes.
import { BoardGame, UserCollection } from "@prisma/client";
import Repository from "./repository";

// Defining types.
type UserCollectionWithBoardGame = UserCollection & {
  boardGame: BoardGame;
};

// Defining interfaces.
interface AddBoardGameToUserCollectionData {
  boardGameId: number;
  userId: number;
}

interface RemoveBoardGameFromUserCollectionData {
  id: number;
}

interface IUserCollectionRepository {
  findUserCollectionsByUserId(
    userId: number
  ): Promise<UserCollectionWithBoardGame[]>;
  findUserCollectionByIdAndUserId(
    id: number,
    userId: number
  ): Promise<UserCollectionWithBoardGame | null>;
  findUserCollectionByUserIdAndBoardGameId(
    userId: number,
    boardGameId: number
  ): Promise<UserCollectionWithBoardGame | null>;
  addBoardGameToUserCollection(
    data: AddBoardGameToUserCollectionData
  ): Promise<UserCollectionWithBoardGame>;
  removeBoardGameFromUserCollection(
    data: RemoveBoardGameFromUserCollectionData
  ): Promise<UserCollectionWithBoardGame>;
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
  async findUserCollectionsByUserId(
    userId: number
  ): Promise<UserCollectionWithBoardGame[]> {
    return await this.db.userCollection.findMany({
      include: { boardGame: true },
      where: { userId },
    });
  }

  /**
   * Retrieves a board game in the user's collection by its ID and the user's ID.
   * @param id The ID of the user's collection record.
   * @param userId The ID of the user.
   * @returns The retrieved board game, or null if it does not exist.
   */
  async findUserCollectionByIdAndUserId(
    id: number,
    userId: number
  ): Promise<UserCollectionWithBoardGame | null> {
    return await this.db.userCollection.findFirst({
      include: { boardGame: true },
      where: { id, userId },
    });
  }

  /**
   * Retrieves a board game in the user's collection by its ID.
   * @param userId The ID of the user.
   * @param boardGameId The ID of the board game.
   * @returns The retrieved board game, or null if it does not exist.
   */
  async findUserCollectionByUserIdAndBoardGameId(
    userId: number,
    boardGameId: number
  ): Promise<UserCollectionWithBoardGame | null> {
    return await this.db.userCollection.findFirst({
      include: { boardGame: true },
      where: { userId, boardGameId },
    });
  }

  /**
   * Adds a board game to the user's collection.
   * @param data The data for adding a board game to the user's collection.
   * @returns The added board game.
   */
  async addBoardGameToUserCollection(
    data: AddBoardGameToUserCollectionData
  ): Promise<UserCollectionWithBoardGame> {
    return await this.db.userCollection.create({
      include: { boardGame: true },
      data,
    });
  }

  /**
   * Removes a board game from the user's collection by its ID.
   * @param data The data containing the ID of the board game to remove.
   * @returns The removed board game.
   */
  async removeBoardGameFromUserCollection({
    id,
  }: RemoveBoardGameFromUserCollectionData): Promise<UserCollectionWithBoardGame> {
    return await this.db.userCollection.delete({
      include: { boardGame: true },
      where: { id },
    });
  }
}
