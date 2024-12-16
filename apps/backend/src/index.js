import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { recipeRouter } from "./routes/recipes.js";
import { authRouter } from "./routes/auth.js";
import { connectToDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const ORIGIN = process.env.ORIGIN;

const app = express();
// Middleware stack
app.use(
  cors({
    credentials: true,
    origin: [ORIGIN],
    allowedHeaders: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/api/health", (req, res) => res.send("Ok"));
app.use("/api/recipes", recipeRouter);
app.use("/api/auth", authRouter);

app.use("/api/uploads", express.static("uploads"));

app.use((error, request, response, next) => {
  console.error(error);
  if (response.headersSent) return next(error);
  response.status(500).json({ errMsg: error.message });
});

connectToDB().then(() =>
  app.listen(process.env.PORT, () => console.log("Server started..."))
);
