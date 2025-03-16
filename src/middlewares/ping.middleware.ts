// Importing: Dependencies.
import { Request, Response, NextFunction } from "express";

// This middleware lets the user know about the server status.
export default function ping() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send("pong");
    } catch (err) {
      next(err);
    }
  };
}
