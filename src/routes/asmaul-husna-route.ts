import express from "express";
import { asmaulHusnaController } from "../controllers/asmaul-husna/asmaul-husna-controller";
import { detailAsmaulHusnaController } from "../controllers/asmaul-husna/detail-asmaul-husna-controller";

const asmaulHusnaRoute = express.Router();

asmaulHusnaRoute.get("/", asmaulHusnaController);
asmaulHusnaRoute.get("/:identifier", detailAsmaulHusnaController);

export default asmaulHusnaRoute;
