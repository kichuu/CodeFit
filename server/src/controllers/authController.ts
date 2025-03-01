import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { Company } from "../models/Company"

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey" // Replace in production

export const registerCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body

    const existingCompany = await Company.findOne({ email })
    if (existingCompany) {
      res.status(400).json({ message: "Company already exists" })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const company = new Company({ name, email, password: hashedPassword })
    await company.save()

    res.status(201).json({ message: "Company registered successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

export const loginCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body

    const company = await Company.findOne({ email })
    if (!company) {
      res.status(400).json({ message: "Invalid email or password" })
      return
    }
    const isMatch = await bcrypt.compare(password, company.password)
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" })
      return
    }
    const token = jwt.sign({ companyId: company._id }, JWT_SECRET, {
      expiresIn: "7h",
    })

    res.json({
      token,
      companyId: company._id,
      name: company.name,
      email: company.email,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}
