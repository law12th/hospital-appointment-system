import express from "express";
import { getCurrentUser } from "../controllers";
import { currentUser } from "../utils";

const router = express.Router();

router.get("/users/current-user", currentUser, getCurrentUser);

export { router as currentUserRouter };
