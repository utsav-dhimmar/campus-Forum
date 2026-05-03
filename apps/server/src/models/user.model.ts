import { model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "@repo/shared";
import { parsedEnv } from "../schemas/env.js";

export interface IUserDocument extends Omit<IUser, "_id">, Document {
	_id: Types.ObjectId;
	comparePassword(password: string): Promise<boolean>;
	generateRefreshToken(): string;
	generateAccessToken(): string;
}

const schema = new Schema<IUserDocument>(
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
	if (!this.isModified("password")) return next();

	try {
		this.password = await bcrypt.hash(this.password as string, 10);
		next();
	} catch (error) {
		console.error("unable to hash user password");
		console.error(error);
		next(error as Error);
	}
});

schema.methods.comparePassword = async function (incommingPassword: string) {
	return await bcrypt.compare(incommingPassword, this.password as string);
};

schema.methods.generateRefreshToken = function () {
	try {
		return jwt.sign(
			{
				_id: this._id,
				email: this.email,
				username: this.username,
			},
			parsedEnv.REFRESH_TOKEN,
			{
				expiresIn: parsedEnv.REFRESH_TOKEN_EXP as any,
			},
		);
	} catch (error) {
		console.error("unable to generate refresh token");
		console.error(error);
		return "";
	}
};

schema.methods.generateAccessToken = function () {
	try {
		return jwt.sign(
			{
				_id: this._id,
			},
			parsedEnv.ACCESS_TOKEN,
			{
				expiresIn: parsedEnv.ACCESS_TOKEN_EXP as any,
			},
		);
	} catch (error) {
		console.error("unable to generate access token");
		console.error(error);
		return "";
	}
};

const User = model<IUserDocument>("User", schema);

export default User;
