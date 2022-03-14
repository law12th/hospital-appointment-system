import express from "express";
import { signin } from "../controllers";
import { signinRules } from "../helpers/validator";

const router = express.Router();

router.post("/user/signin", signinRules(), signin);

export { router as authRouter };
