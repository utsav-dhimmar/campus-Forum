import { Router } from "express";
import {
	login,
	logout,
	signUp,
	getUserInfo,
	newRefreshToken,
} from "../controllers/users.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/new-refresh-token", newRefreshToken);

router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getUserInfo);

export default router;
