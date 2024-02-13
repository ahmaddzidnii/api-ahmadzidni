import { Request, Response } from "express";

export const yourController = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello Akun!" });
};
