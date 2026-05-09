import { model, Schema, Document, Types } from "mongoose";
import { IAnswer } from "@repo/shared";

export interface IAnswerDocument extends Omit<IAnswer, "_id">, Document {
  _id: Types.ObjectId;
}

const schema = new Schema<IAnswerDocument>(
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Answer = model<IAnswerDocument>("Answer", schema);

export default Answer;
