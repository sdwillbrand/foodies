import { model, Schema } from "mongoose";

export const TagSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
});

export const Tag = model("tag", TagSchema);
