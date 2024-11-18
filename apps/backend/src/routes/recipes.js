import { Router } from "express";
import { Recipe } from "../models/recipe.js";
import { checkJWT, checkUser } from "../middlewares/checkJWT.js";
import { upload } from "../middlewares/multer.js";

export const recipeRouter = Router();

recipeRouter.get("/", async (req, res, next) => {
  try {
    const page = req.query.page ?? 1;
    const size = req.query.size ?? 10;

    const result = await Recipe.find({ public: true })
      .limit(size)
      .skip(page - 1);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

recipeRouter.post(
  "/",
  checkJWT,
  upload.single("bannerImage"),
  async (req, res, next) => {
    try {
      // `req.body` now contains text fields, and `req.file` contains the uploaded file
      const recipeData = {
        title: req.body.title,
        description: req.body.description,
        user: req.user, // From your JWT middleware
        bannerImage: req.file?.path, // File path of uploaded image
        ingredients: JSON.parse(req.body.ingredients),
        instructions: JSON.parse(req.body.instructions),
      };

      // Save the recipe to the database
      const recipe = await Recipe.create(recipeData);
      res.status(201).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

recipeRouter.get("/:slug", checkUser, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const query = {
      slug,
      public: true,
    };
    // Allow access to private recipe
    if (req.user) {
      delete query.public;
      query.user = req.user;
    }
    const recipe = await Recipe.findOne(query);
    if (!recipe) {
      return res.sendStatus(404);
    }
    return res.json(recipe);
  } catch (e) {
    next(e);
  }
});

recipeRouter.get("/:userId/all", checkJWT, async (req, res, next) => {
  try {
    const page = req.query.page ?? 1;
    const size = req.query.size ?? 10;
    const user = req.user;
    const { userId } = req.params;

    if (userId !== user._id) {
      return res.sendStatus(403);
    }

    const result = await Recipe.find({ user })
      .limit(size)
      .skip(page - 1);
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

recipeRouter.put("/:id", checkJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const recipe = await Recipe.findById(id);
    if (recipe.user !== user) {
      return res.sendStatus(403);
    }
    const newRecipe = await Recipe.findOneAndUpdate(
      { _id: id, user },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(newRecipe);
  } catch (e) {
    next(e);
  }
});

recipeRouter.delete("/:id", checkJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const recipe = await Recipe.findById(id);
    if (recipe.user !== user) {
      return res.sendStatus(403);
    }
    await Recipe.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});
