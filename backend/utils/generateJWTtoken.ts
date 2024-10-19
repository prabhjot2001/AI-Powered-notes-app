import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";

export const generateJWTtoken = (id: string): string => {
  return jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "1d" });
};
