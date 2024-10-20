import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";
import { prisma } from "../prisma_client/prisma";

const VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "Auth token required" });
  }

  // Ensure the token follows the "Bearer <token>" format
  if (!authorization.startsWith("Bearer ")) {
    return res.status(400).json({ msg: "Token format is invalid" });
  }

  const token = authorization.split(" ")[1];  // Extract token

  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Decode token
    const user = await prisma.user.findUnique({
      where: { id: (decoded as { id: string }).id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    req.user = user?.id;
    next();  // Proceed to next middleware or route handler
  } catch (error: any) {
    console.log("JWT Error:", error.message);  // Log error details
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

export default VerifyUser;
