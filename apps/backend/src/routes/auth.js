import { Router } from "express";
import { createHash } from "crypto";
import { User } from "../models/user.js";
import { issueJwt } from "../libs/auth.js";
import { checkJWT } from "../middlewares/checkJWT.js";
import { Recipe } from "../models/recipe.js";
import { Tag } from "../models/tag.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { username, nickname, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(404);
  }
  const sha256 = createHash("sha256");
  const hash = sha256.update(password).digest("hex");
  await User.create({ username, nickname, password: hash });
  return res.sendStatus(201);
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).populate({
    path: "recipes",
    populate: {
      path: "tags",
    },
  });
  if (!user) {
    return res.sendStatus(404);
  }
  const sha256 = createHash("sha256");
  const hash = sha256.update(password).digest("hex");
  if (user.password !== hash) {
    return res.sendStatus(401);
  }
  const token = issueJwt(user);
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 900000),
  });
  return res.json(user);
});

authRouter.get("/logout", async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.end();
});

authRouter.get("/status", checkJWT, async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId).populate({
    path: "recipes",
    model: Recipe,
    populate: {
      path: "tags",
      model: Tag,
    },
  });
  return res.json(user);
});
