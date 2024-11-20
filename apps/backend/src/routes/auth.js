import { Router } from "express";
import { createHash } from "crypto";
import { User } from "../models/user.js";
import { issueJwt } from "../libs/auth.js";
import { checkJWT } from "../middlewares/checkJWT.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { username, nickname, password } = req.body;
  if (!username) {
    res.sendStatus(404);
    return;
  }
  const sha256 = createHash("sha256");
  const hash = sha256.update(password).digest("hex");
  await User.create({ username, nickname, password: hash });
  res.sendStatus(201);
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).populate("recipes");
  if (!user) {
    res.sendStatus(404);
    return;
  }
  const sha256 = createHash("sha256");
  const hash = sha256.update(password).digest("hex");
  if (user.password !== hash) {
    res.sendStatus(401);
    return;
  }
  const token = issueJwt(user);
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    expires: new Date(Date.now() + 900000),
  });
  res.json(user);
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
  const user = await User.findById(userId).populate("recipes");
  return res.json(user);
});
