import express from "express";
import { searchLocationController } from "../controllers/jadwal-shalat/search-location-controller";
import scheduleController from "../controllers/jadwal-shalat/schedule-controller";
import { cityLocationController } from "../controllers/jadwal-shalat/city-location-controller";

const jadwalRouter = express.Router();

jadwalRouter.get("/city", cityLocationController);
jadwalRouter.get("/city/search", searchLocationController);
jadwalRouter.get(
  "/schedule/:id_kota/:date",
  scheduleController.scheduleDayController
);
jadwalRouter.get(
  "/schedule/:id_kota/:month/:year",
  scheduleController.scheduleMonthController
);

export default jadwalRouter;
