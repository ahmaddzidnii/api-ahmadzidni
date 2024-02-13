/**
 * 500 response & log when errors are raised.
 *
 * @param {Error} err
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next
 * @returns
 */

import { NextFunction, Request, Response } from "express";

export const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  return res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : `${err}`,
    })
    .end();
};
