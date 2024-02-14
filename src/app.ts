import express, { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieparser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import { notFoundMiddleware } from "./middleware/not-found";
import { errorMiddleware } from "./middleware/error-middleware";

import jadwalRoute from "./routes/jadwal-route";

const app = express();
app.set("trust proxy", true);

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
app.get("/", async (_req, res, next) => {
  try {
    res.json({
      message: "Hello World!",
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    next(error);
  }
});
// Apply routes before error handling
app.use("/v1/shalat", jadwalRoute);

// Apply error handling last
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
