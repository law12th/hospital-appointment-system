import express from "express";
import { createAccount, selectDate, getAppointments } from "../controllers";
import { signupRules } from "../helpers/validator";

const router = express.Router();

router.post("/create-account", signupRules(), createAccount);
router.route("/patient/:patientID/").get(getAppointments).post(selectDate);

export { router as patientRouter };
