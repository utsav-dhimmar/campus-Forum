import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "./utils/logger.js";
const app = express();

app.use(
	cors({
		origin: "*", // temporary
	}),
);
app.use(logger);

app.use(
	express.json({
		limit: "10KB",
	}),
);

app.use(
	express.urlencoded({
		extended: true,
		limit: "10KB",
	}),
);

app.use(cookieParser());

// app.use((req, res, next) => {
// 	res.set("Cache-Control", "max-age=300");
// 	next();
// });

import usersRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import GlobalErrorHandler from "./utils/GlobalError.js";

app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/admin", adminRoutes);

app.use(GlobalErrorHandler);
app.use(function (req, res, next) {
	res.status(404).json({
		message: "Route not found",
	});
	return next();
});
export default app;
