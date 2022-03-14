import express from "express";
import {
  addDoctor,
  removeDoctor,
  getDoctors,
  createAdmin,
} from "../controllers";
import { signupRules } from "../helpers/validator";

const router = express.Router();

router.route("/admin/manage").post(signupRules(), addDoctor).get(getDoctors);
router.post("/admin/manage/delete-doctor", removeDoctor);
router.post("/admin", signupRules(), createAdmin);

export { router as adminRouter };
