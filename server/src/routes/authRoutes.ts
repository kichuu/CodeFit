import express from "express";
import { registerCompany, loginCompany } from "../controllers/authController";

const Authrouter = express.Router();

Authrouter.post("/register", registerCompany);
Authrouter.post("/login", loginCompany);

export default Authrouter;
