import { Request, Response } from "express";

const getCurrentUser = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export { getCurrentUser };
