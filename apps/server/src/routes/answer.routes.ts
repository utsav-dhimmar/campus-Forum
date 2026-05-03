import { Router } from "express";
import { deleteAnswer, getAnswer } from "../controllers/answer.controller.js";
import { getMyAnswers } from "../controllers/users.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = Router();

router.use(authMiddleware);

router.route("/:answerId").get(getAnswer).delete(deleteAnswer);
router.route("/user/my-answers").get(getMyAnswers);

export default router;
