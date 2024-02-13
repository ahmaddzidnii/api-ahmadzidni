import { Request, Response } from "express";

/**
 * JSON 404 response
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const notFoundMiddleware = (req: Request, res: Response) => {
  const PATH = req.path;
  return res
    .status(404)
    .json({ code: 404, path: PATH, error: "Route not found !!!" });
};
