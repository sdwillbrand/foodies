import { Router } from "express";
import { Tag } from "../models/tag.js";
import { checkJWT } from "../middlewares/checkJWT.js";

export const tagsRouter = Router();

tagsRouter.post("/", checkJWT, async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body.name);
    return res.json(tag);
  } catch (e) {
    next(e);
  }
});

tagsRouter.get("/", async (req, res, next) => {
  try {
    const search = req.query.search;
    const result = await Tag.find({ name: { $regex: search } }).limit(10);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});
