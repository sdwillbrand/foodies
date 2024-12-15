import mongoose from "mongoose";

export async function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  if (!MONGODB_URI) {
    throw new Error("Error: ENV not existing");
  }
  await mongoose.connect(`mongodb://${MONGODB_URI}`, {
    user: DB_USERNAME,
    pass: DB_PASSWORD,
  });
  console.log("Connected!");
}
