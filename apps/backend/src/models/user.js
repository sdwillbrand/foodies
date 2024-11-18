import { model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    nickname: {
      required: true,
      type: String,
    },
    profileImage: {
      type: String,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.__v;
  delete object.password;
  return object;
};

export const User = model("user", UserSchema);
