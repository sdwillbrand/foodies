import { model, Schema } from "mongoose";
import { IngredientSchema } from "./ingredient.js";
import { InstructionSchema } from "./instruction.js";
import { toKebab } from "../libs/strings.js";
import { User } from "./user.js";

export const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    bannerImage: String,
    ingredients: [IngredientSchema],
    instructions: [InstructionSchema],
    public: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tag",
      },
    ],
  },
  { timestamps: true }
);

RecipeSchema.pre("save", function (next) {
  const slug = toKebab(this.title);
  this.slug = slug;
  return next();
});

RecipeSchema.post("save", async function (res, next) {
  const user = await User.findById(res.user);
  user.recipes.push(res._id);
  user.save();
  next();
});

RecipeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const Recipe = model("recipe", RecipeSchema);
