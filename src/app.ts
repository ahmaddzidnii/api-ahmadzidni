import express, { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

import morgan from "morgan";
import helmet from "helmet";
import cookieparser from "cookie-parser";
import cors from "cors";

import { notFoundMiddleware } from "./middleware/not-found";
import { errorMiddleware } from "./middleware/error-middleware";

import { cache } from "./libs/cache";

import jadwalRoute from "./routes/jadwal-route";
import doaRouter from "./routes/doa-route";

import { api_meta } from "../config";

const app = express();

app.set("trust proxy", true);

app.set("view engine", "ejs");

const keyGenerator = function keyGenerator(
  request: Request,
  _response: Response
): string {
  if (!request.ip) {
    console.error("Warning: request.ip is missing!");
    return request.socket.remoteAddress!!;
  }

  return request.ip.replace(/:\d+[^:]*$/, "");
};

const rateLimitConfig = rateLimit({
  windowMs: 20 * 1000,
  limit: 15,
  legacyHeaders: true,
  standardHeaders: "draft-7",
  keyGenerator,
});

app.use(rateLimitConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(cors());

app.use(helmet());
app.use(morgan("tiny"));

// root route
app.get("/", async (_req, res) => {
  res.status(200).json({
    api_version: api_meta.version,
    response: "Welcome to API Ahmad Zidni",
  });
});

// route for jadwal shalat
app.use("/v1/shalat", cache("10 minutes"), jadwalRoute);

// route for doa
app.use("/v1/prayer", cache("10 minutes"), doaRouter);

// Apply error handling last
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
