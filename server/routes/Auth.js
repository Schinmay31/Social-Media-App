import express from "express";
import { login } from "../controllers/auth.js"
import { verifyLogin } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get('/verify',verifyToken,verifyLogin);

export default router;
