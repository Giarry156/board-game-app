// Importing: Dependencies.
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export default function error() {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    // Checking if error is an instance of HttpError.
    if (createHttpError.isHttpError(err)) {
      res.status(err.status).json({
        status: err.status,
        message: err.message,
      });
    }
    // Checking if error is a schema validator error.
    else if (err instanceof ZodError) {
      res.status(400).json({
        status: 400,
        message: "Invalid input data provided.",
        info: err.errors,
      });
    }
    // Throwing a generic error.
    else {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  };
}
