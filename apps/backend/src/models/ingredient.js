import { Schema } from "mongoose";

export const IngredientSchema = new Schema(
  {
    unit: {
      type: String,
      enum: ["ml", "l", "g", "kg", "Prise", "EL", "TL"],
    },
    quantity: {
      required: true,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
  },
  { _id: false }
);
