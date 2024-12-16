import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { recipeRouter } from "./routes/recipes.js";
import { authRouter } from "./routes/auth.js";
import { connectToDB } from "./db.js";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const ORIGIN = process.env.ORIGIN || "http://localhost:5173";
const corsOptions = {
  credentials: true,
  origin: [ORIGIN],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(morgan("short"));
// Middleware stack
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.get("/api/health", (req, res) => res.send("Ok"));
app.use("/api/recipes", recipeRouter);
app.use("/api/auth", authRouter);

app.use((error, request, response, next) => {
  console.error(error);
  if (response.headersSent) return next(error);
  response.status(500).json({ errMsg: error.message });
});

connectToDB().then(() =>
  app.listen(process.env.PORT, () => console.log("Server started..."))
);
