// Importing: Dependencies.
import { NextFunction, Request, Response } from "express";

// Importing: Services.
import UserService from "../services/user.service";
import { registerValidator } from "../validators/user.validator";

export default class UserController {
  private userService = new UserService();

  constructor() {}

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body.
      registerValidator.parse(req.body);

      // Deconstructuring the request body.
      const { name, email, password } = req.body;

      // Creating a new user.
      const data = await this.userService.registerUser({
        name,
        email,
        password,
      });

      // Returning the user.
      res.status(201).json({
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
