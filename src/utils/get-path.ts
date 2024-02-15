import { Request } from "express";

export const getPath = (req: Request) => {
  return req.originalUrl.split("?")[0];
};
