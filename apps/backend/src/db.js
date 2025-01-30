import mongoose from "mongoose";

export async function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const isDev = process.env.NODE_ENV === "dev";
  if (!MONGODB_URI) {
    throw new Error("Error: ENV not existing");
  }
  await mongoose.connect(`mongodb${isDev ? "" : "+srv"}://${MONGODB_URI}`, {
    user: isDev ? null : DB_USERNAME,
    pass: isDev ? null : DB_PASSWORD,
  });
  console.log("Connected!");
}
