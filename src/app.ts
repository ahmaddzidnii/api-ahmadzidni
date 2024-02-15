import express, { Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieparser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import path from "path";
import favicon from "serve-favicon";

import { notFoundMiddleware } from "./middleware/not-found";
import { errorMiddleware } from "./middleware/error-middleware";

import jadwalRoute from "./routes/jadwal-route";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

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
app.get("/", async (_req, res, next) => {
  res.render("index", { name: "John", title: "api.ahmadzidni.site" });
});
// Apply routes before error handling
app.use("/v1/shalat", jadwalRoute);

// Apply error handling last
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
