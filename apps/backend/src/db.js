import mongoose from "mongoose";

export async function connectToDB() {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) {
    throw new Error("Error: ENV not existing");
  }
  await mongoose.connect(MONGODB_URL);
  console.log("Connected!");
}
