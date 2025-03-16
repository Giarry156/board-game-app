// Importing: Classes.
import { User } from "@prisma/client";
import Repository from "./repository";

// Defining interfaces.
interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

interface IUserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(data: CreateUserData): Promise<User>;
  updateUser(id: number, data: UpdateUserData): Promise<User>;
  deleteUser(id: number): Promise<User>;
}

// Defining repository.
export default class UserRepository
  extends Repository
  implements IUserRepository
{
  constructor() {
    super();
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return await this.db.user.findUnique({ where: { email } });
  }

  /**
   * Creates a new user.
   * @param data The data for creating a new user.
   * @returns The created user.
   */
  public async createUser(data: CreateUserData): Promise<User> {
    return await this.db.user.create({ data });
  }

  /**
   * Updates an existing user.
   * @param id The id of the user to update.
   * @param data The data to update the user with.
   * @returns The updated user.
   */
  public async updateUser(id: number, data: UpdateUserData): Promise<User> {
    return await this.db.user.update({ where: { id }, data });
  }

  /**
   * Deletes a user by their id.
   * @param id The id of the user to delete.
   * @returns The deleted user.
   */
  public async deleteUser(id: number): Promise<User> {
    return await this.db.user.delete({ where: { id } });
  }
}
