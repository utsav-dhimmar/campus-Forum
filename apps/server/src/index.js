import app from "./app.js";
import connectDB from "./config/db.js";

connectDB()
	.then(() => {
		const PORT = process.env.PORT;
		app.listen(PORT, () => {
			console.log(
				`server started on port ${PORT} \n http://localhost:${PORT}`,
			);
		});
	})
	.catch(() => {
		console.log(`mongo db failed to connect`);
	});
