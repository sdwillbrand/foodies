import { Router } from "express";
import { Recipe } from "../models/recipe.js";
import { checkJWT, checkUser } from "../middlewares/checkJWT.js";
import { validate } from "../middlewares/validate.js";
import { putRecipeSchema } from "../schemas/recipe.js";

export const recipesRouter = Router();

recipesRouter.get("/", async (req, res, next) => {
  try {
    const p = parseInt(req.query.p) || 1;
    const size = req.query.size ?? 10;
    const q = req.query.q ?? "";

    const [result] = await Recipe.aggregate([
      {
        $lookup: {
          from: "tags", // Name of the Tag collection
          localField: "tags", // Field in the Recipe schema
          foreignField: "_id", // Field in the Tag schema
          as: "tags", // Output array name
        },
      },
      {
        $lookup: {
          from: "ingredients", // Adjust collection name if necessary
          localField: "ingredients",
          foreignField: "_id",
          as: "ingredients",
        },
      },
      {
        $match: { public: true },
      },
      {
        $match: {
          $or: [
            { description: { $regex: q, $options: "i" } },
            { title: { $regex: q, $options: "i" } },
            { "tags.name": { $regex: q, $options: "i" } },
            { "ingredients.name": { $regex: q, $options: "i" } },
          ],
        },
      },
      {
        $facet: {
          total: [{ $count: "count" }], // Count matching documents
          data: [
            { $skip: (p - 1) * size }, // Skip for pagination
            { $limit: size }, // Limit for pagination
          ],
        },
      },
    ]);

    // Extract the total count and paginated data
    const total = result.total[0]?.count || 0; // Total count of matching documents
    const recipes = result.data; // Paginated recipes
    return res.json({ recipes, total });
  } catch (e) {
    next(e);
  }
});

recipesRouter.post("/", checkJWT, async (req, res, next) => {
  try {
    // Save the recipe to the database
    req.body.user = req.user;
    const recipe = await Recipe.create(req.body);
    return res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
});

recipesRouter.get("/:slug", checkUser, async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const recipe = await Recipe.findOne({ slug }).populate("tags");
    if (!recipe) {
      return res.sendStatus(404);
    }
    // Wenn das Rezept privat ist und nicht dem User gehört, dann brich die Anfrage ab
    if (!recipe.public && recipe.user !== req.user) {
      return res.sendStatus(401);
    }
    return res.json(recipe);
  } catch (e) {
    next(e);
  }
});

recipesRouter.get("/:userId/all", checkJWT, async (req, res, next) => {
  try {
    const p = req.query.p ?? 1;
    const size = req.query.size ?? 10;
    const user = req.user;
    const { userId } = req.params;
    if (userId !== user) {
      return res.sendStatus(403);
    }

    const result = await Recipe.find({ user })
      .limit(size)
      .skip(p - 1)
      .populate("tags");
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

recipesRouter.put("/:id", checkJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const recipe = await Recipe.findById(id);
    if (!recipe.user.equals(user)) {
      return res.sendStatus(403);
    }
    const newRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json(newRecipe);
  } catch (e) {
    next(e);
  }
});

recipesRouter.delete("/:id", checkJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const recipe = await Recipe.findById(id);
    if (!recipe.user.equals(user)) {
      return res.sendStatus(403);
    }
    await Recipe.findByIdAndDelete(id);
    return res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
