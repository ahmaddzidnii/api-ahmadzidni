import express from "express";
import { getAllJuzController } from "../controllers/al-quran/get-all-juz-controller";
const alQuranRoute = express.Router();

alQuranRoute.get("/juzs", getAllJuzController);

export default alQuranRoute;
