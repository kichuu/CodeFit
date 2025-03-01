import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "abcd"; // Replace in production

export const authMiddleware = async(req: Request, res: Response, next: NextFunction): Promise<void>=> {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
     res.status(401).json({ message: "Access denied. No token provided." });
     return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body.companyId = (decoded as any).companyId; // Attach company ID to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
