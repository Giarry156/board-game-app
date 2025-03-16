// Importing: Dependencies.
import createHttpError from "http-errors";
import passport from "../config/passport";
import { Request, Response, NextFunction } from "express";

// Exporting middleware.
export default function authUser() {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "basic",
      { session: false },
      (error: any, user: any, info: any) => {
        try {
          if (error || !user || info) {
            throw createHttpError(401, "Invalid credentials.");
          } else {
            req.user = user;
            next();
          }
        } catch (error) {
          next(error);
        }
      }
    )(req, res, next);
  };
}
