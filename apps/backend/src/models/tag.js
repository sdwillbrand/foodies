import { model, Schema } from "mongoose";

export const TagSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const Tag = model("tag", TagSchema);
