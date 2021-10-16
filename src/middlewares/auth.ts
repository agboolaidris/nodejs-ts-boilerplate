import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const auth_middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies["access-token"];

    if (!cookie) return res.status(401).json({ error: "unathorize" });

    if (!process.env.JWT_SECRET)
      return res
        .status(500)
        .json({ error: "unathorized, jwt_secret is no provided" });

    const { _id }: any = jwt.verify(cookie, process.env.JWT_SECRET);

    if (!_id)
      return res.status(400).json({ error: "unathorized,user verified fail" });

    const user = await User.findById(_id);
    if (!user)
      return res.status(400).json({ error: "unathorized,user not found" });

    res.locals.user = user;

    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
