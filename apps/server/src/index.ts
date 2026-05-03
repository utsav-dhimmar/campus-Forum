import app from "./app.js";
import connectDB from "./config/db.js";
import { parsedEnv } from "./schemas/env.js";

connectDB()
	.then(() => {
		const PORT = parsedEnv.PORT || 3000;
		app.listen(PORT, () => {
			console.log(
				`server started on port ${PORT} \n http://localhost:${PORT}`,
			);
		});
	})
	.catch((error) => {
		console.log(`mongo db failed to connect`, error);
	});
