import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new Schema(
	{
		username: {
			type: String,
			index: true,
			required: true,
			lowercase: true,
			trim: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
			unique: true,
			index: true,
		},
		department: {
			type: String,
			// unique: true,
			// required: true,
		},
		password: {
			type: String,
			required: true,
			min: [8, "Password must be eight character long"],
		},
		role: {
			type: String,
			enum: ["USER", "ADMIN", "MODERATOR"],
			default: "USER",
		},
		refreshToken: String,
	},
	{
		timestamps: true,
	},
);

schema.pre("save", async function (next) {
	// create hash when password is modify

	if (!this.isModified("password")) next();

	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (error) {
		console.error("unable to hash user password");
		console.error(error);
		next();
	}
});

/**
 *
 * @param {string} incommingPassword
 * @returns {Promise<boolean>}
 */
schema.methods.comparePassword = async function (incommingPassword) {
	return await bcrypt.compare(incommingPassword, this.password);
};

schema.methods.generateRefreshToken = function () {
	try {
		return jwt.sign(
			{
				_id: this._id,
				email: this.email,
				username: this.username,
			},
			process.env.REFRESH_TOKEN,
			{
				expiresIn: process.env.REFRESH_TOKEN_EXP,
			},
		);
	} catch (error) {
		console.error("unable to generate refresh token");
		console.error(error);
	}
};

schema.methods.generateAccessToken = function () {
	try {
		return jwt.sign(
			{
				_id: this._id,
			},
			process.env.ACCESS_TOKEN,
			{
				expiresIn: process.env.ACCESS_TOKEN_EXP,
			},
		);
	} catch (error) {
		console.error("unable to generate access token");
		console.error(error);
	}
};

const User = model("User", schema);

export default User;
