// Importing: Dependencies.
import bcrypt from "bcrypt";

// Importing: Repositories.
import UserRepository from "../repositories/user.repository";
import createHttpError from "http-errors";

export default class UserService {
  private userRepository = new UserRepository();

  constructor() {}

  /**
   * Registers a new user in the system.
   * @param data - An object containing the user's name, email, and password.
   * @throws {HttpError} If a user with the given email already exists.
   * @returns The newly created user.
   */
  public async registerUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    // Checking if the user already exists.
    const user = await this.userRepository.findUserByEmail(data.email);

    if (user) {
      throw createHttpError(409, "A user with this email already exists.");
    }

    // Creating the user.
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  /**
   * Logs in a user by verifying their email and password.
   * @param data - An object containing the user's email and password.
   * @throws {HttpError} If the user is not found or if the password is incorrect.
   * @returns The authenticated user.
   */
  public async loginUser(data: { email: string; password: string }) {
    // Checking if the user exists.
    const user = await this.userRepository.findUserByEmail(data.email);

    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    // Checking if the password is correct.
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid password.");
    }

    // Returning the user.
    return user;
  }
}
