import { Request, Response, NextFunction } from "express";
import { config } from "../../config";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  role_id: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      config.jwt_secret!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (err) {
    res.send({ currentUser: null });
  }

  next();
};
