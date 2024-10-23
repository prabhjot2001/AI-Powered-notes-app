import type { Request, Response } from "express";
import { prisma } from "../prisma_client/prisma";
import argon2 from "argon2";
import validator from "validator";
import { generateJWTtoken } from "../utils/generateJWTtoken";

const formatUser = (user: {
  id: string;
  password: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}) => {
  return {
    ...user,
    token: generateJWTtoken(user.id),
    password: undefined,
    id: user.id
  };
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Please enter a valid email" });
    }
    if (password.length < 4) {
      return res
        .status(400)
        .json({ msg: "Password must be atleast 4 characters long" });
    }
    // if (!validator.isStrongPassword(password)) {
    //   return res.status(400).json({ msg: "Password is not strong enough" });
    // }

    const isUserExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isUserExists) {
      return res
        .status(400)
        .json({ msg: "Email is already in use. Try login instead." });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.json(formatUser(newUser));
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Please enter a valid email" });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    return res.json(formatUser(user));
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
