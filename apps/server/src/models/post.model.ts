import { model, Schema, Document, Types } from "mongoose";
import { IPost } from "@repo/shared";

export interface IPostDocument extends Omit<IPost, "_id">, Document {
  _id: Types.ObjectId;
}

const schema = new Schema<IPostDocument>(
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

const Post = model<IPostDocument>("Post", schema);

export default Post;
