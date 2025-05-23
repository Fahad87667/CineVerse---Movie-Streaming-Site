import express from "express";
import { register, login, verifyToken } from "../controllers/AuthControl.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);

export default router;
