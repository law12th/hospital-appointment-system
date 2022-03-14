import express from "express";
import {
  approveAppointmentDate,
  changeAppointmentDate,
  showAppointments,
} from "../controllers";

const router = express.Router();

router
  .route("/doctor/:doctorID")
  .post(approveAppointmentDate)
  .patch(changeAppointmentDate)
  .get(showAppointments);

export { router as doctorRouter };
