import express from "express";
import { jadwalController } from "../controllers/jadwal-controller";

const jadwalRouter = express.Router();

jadwalRouter.get("/city", jadwalController);

export default jadwalRouter;
