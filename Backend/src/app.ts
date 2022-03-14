import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

import {
  adminRouter,
  doctorRouter,
  patientRouter,
  currentUserRouter,
  authRouter,
} from "./routes";
import {
  errorHandler,
  NotFoundError,
  requestLogger,
  currentUser,
} from "./utils";

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(cookieSession({ signed: false }));
app.set("trust proxy", true);

app.use("/api", adminRouter);
app.use("/api", doctorRouter);
app.use("/api", patientRouter);
app.use("/api", currentUserRouter);
app.use("/api", authRouter);

app.use(requestLogger);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
// app.use(currentUser);

export { app };
