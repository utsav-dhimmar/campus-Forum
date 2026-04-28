import { Router } from "express";
import {
	getAllUsers,
	getUser,
	handleLogin,
	handleLogout,
	deleteUser,
	deletePost,
	deleteAnswer,
	getAnalytics,
	updateUserRole,
} from "../controllers/admin.controller.js";
import { getAllPost, getPost } from "../controllers/post.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = Router();

router.route("/login").post(handleLogin);

router.use(adminMiddleware);

router.route("/logout").post(handleLogout);

router.get("/users", getAllUsers);
router.route("/users/:userId").get(getUser).delete(deleteUser);
router.route("/users/:userId/role").patch(updateUserRole);

router.get("/posts", getAllPost);
router.route("/posts/:postId").get(getPost).delete(deletePost);

router.route("/answers/:answerId").delete(deleteAnswer);

router.route("/analytics").get(getAnalytics);

export default router;
