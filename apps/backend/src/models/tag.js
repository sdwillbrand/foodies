import { model, Schema } from "mongoose";

export const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Tag = model("tag", TagSchema);
