import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const SECRET = "shouldBeUsingAPrivateKey";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    const decoded: any = jwt.verify(authorization ?? "", SECRET);
    res.locals.username = decoded.username;
    next();
  } catch (error) {
    res.status(403).json({ error: "unauthenticated" });
  }
};
