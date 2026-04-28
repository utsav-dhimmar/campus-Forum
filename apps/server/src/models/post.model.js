import mongoose, { model, Schema } from "mongoose";
/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const schema = new Schema(
	{
		body: {
			type: String,
			required: true,
			trim: true,
			minlength: [10, "Post must have atleast 10 characters"],
		},
		authorId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Post = model("Post", schema);

export default Post;
