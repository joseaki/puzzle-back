import { Request, Response } from "express";
import { User } from "../schemas/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/authentication";

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    await User.create({
      username,
      password: bcrypt.hashSync(password, 8),
    });
    const token = jwt.sign({ username }, SECRET);
    return res.json({ token });
  } catch (error) {
    return res.status(409).json({ error: "Invalid username" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  }).exec();
  if (!user || !bcrypt.compareSync(password, user.password!)) {
    return res.status(403).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, SECRET);
  return res.json({ token });
};
