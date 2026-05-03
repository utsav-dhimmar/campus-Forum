import { connect } from "mongoose";
import { parsedEnv } from "../schemas/env.js";
const connectDB = async () => {
	try {
		const uri = parsedEnv.MONGODB_URI;
		await connect(uri, {
			dbName: "campusForum",
		});
		console.log(`mongoDB connected successfully :)`);
	} catch (error: any) {
		console.log(`DB connection failed \n ${error} \n ${error?.message}`);
		process.exit(1);
	}
};

export default connectDB;
