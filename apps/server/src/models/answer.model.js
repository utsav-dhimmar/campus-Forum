import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		authorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: "Post",
			required: true,
		},
		content: {
			type: String,
			minlength: [10, "Post must have atleast 10 characters"],
			required: true,
			trim: true,
		},
		// mods
		isDeleted: {
			type: Boolean,
			default: false,
		},
		deletedBy: {
			type: Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{
		timestamps: true,
	},
);

const Answer = model("Answer", schema);

export default Answer;
