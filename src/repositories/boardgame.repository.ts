// Importing: Classes.
import { BoardGame } from "@prisma/client";
import Repository from "./repository";

// Defining interfaces.
interface CreateBoardGameData {
  code: string;
  title: string;
  numberOfPlayers: number;
  duration: number;
  publisher: string;
}

interface UpdateBoardGameData {
  code?: string;
  title?: string;
  numberOfPlayers?: number;
  duration?: number;
  publisher?: string;
}

interface IBoardGameRepository {
  getBoardGamesList(): Promise<BoardGame[]>;
  findBoardGameByCode(code: string): Promise<BoardGame | null>;
  createBoardGame(data: CreateBoardGameData): Promise<BoardGame>;
  updateBoardGame(id: number, data: UpdateBoardGameData): Promise<BoardGame>;
  deleteBoardGame(id: number): Promise<BoardGame>;
}

// Defining repository.
export default class BoardGameRepository
  extends Repository
  implements IBoardGameRepository
{
  constructor() {
    super();
  }

  /**
   * Retrieves a list of all boardGames.
   * @returns A list of boardGames.
   */
  public async getBoardGamesList(): Promise<BoardGame[]> {
    return await this.db.boardGame.findMany();
  }

  /**
   * Retrieves a boardGame by their code.
   * @param code The code of the boardGame to retrieve.
   * @returns The retrieved boardGame, or null if it does not exist.
   */
  public async findBoardGameByCode(code: string): Promise<BoardGame | null> {
    return await this.db.boardGame.findUnique({ where: { code } });
  }

  /**
   * Creates a new boardGame.
   * @param data The data for creating a new boardGame.
   * @returns The created boardGame.
   */
  public async createBoardGame(data: CreateBoardGameData): Promise<BoardGame> {
    return await this.db.boardGame.create({ data });
  }

  /**
   * Updates an existing boardGame.
   * @param id The id of the boardGame to update.
   * @param data The data to update the boardGame with.
   * @returns The updated boardGame.
   */
  public async updateBoardGame(
    id: number,
    data: UpdateBoardGameData
  ): Promise<BoardGame> {
    return await this.db.boardGame.update({ where: { id }, data });
  }

  /**
   * Deletes a boardGame by their id.
   * @param id The id of the boardGame to delete.
   * @returns The deleted boardGame.
   */
  public async deleteBoardGame(id: number): Promise<BoardGame> {
    return await this.db.boardGame.delete({ where: { id } });
  }
}
