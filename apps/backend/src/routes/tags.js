import { Router } from "express";
import { Tag } from "../models/tag.js";

export const tagsRouter = Router();

tagsRouter.post("/", async (req, res, next) => {
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
