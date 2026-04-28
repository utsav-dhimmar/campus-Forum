import connectDB from "./config/db.js";
import User from "./models/user.model.js";
async function main() {
	await connectDB()
	const res = await User.find({});
	console.log(res);
}

await main();
