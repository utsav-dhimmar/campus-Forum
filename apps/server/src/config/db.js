import { connect } from "mongoose";

const connectDB = async () => {
	console.log(process.env.MONGODB_URI);
	try {
		await connect(process.env.MONGODB_URI, {
			dbName: "campusForum",
		});
		console.log(`mongoDB connected successfully :)`);
	} catch (error) {
		console.log(`DB connection failed \n ${error} \n ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
