import express from "express";
import { doaController } from "../controllers/doa/doa-controller";
import { detailDoaController } from "../controllers/doa/detail-doa-controller";

const doaRouter = express.Router();

doaRouter.get("/", doaController);
doaRouter.get("/:identifier", detailDoaController);

export default doaRouter;
