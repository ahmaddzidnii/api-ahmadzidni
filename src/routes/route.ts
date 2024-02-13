import express, { Request, Response } from "express";
import { yourController } from "../controllers/your-controller";

const router = express.Router();

router.get("/hello", yourController);

export default router;
