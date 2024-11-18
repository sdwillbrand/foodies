import { Schema } from "mongoose";

export const InstructionSchema = new Schema(
  {
    description: {
      required: true,
      type: String,
    },
    images: [String],
  },
  { _id: false }
);
