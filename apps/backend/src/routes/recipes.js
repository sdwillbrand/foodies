import { Router } from "express";
import { Recipe } from "../models/recipe.js";
import { checkJWT, checkUser } from "../middlewares/checkJWT.js";
import { validate } from "../middlewares/validate.js";
import { putRecipeSchema } from "../schemas/recipe.js";

export const recipeRouter = Router();

recipeRouter.get("/", async (req, res, next) => {
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

recipeRouter.post("/", checkJWT, async (req, res, next) => {
  try {
    // Save the recipe to the database
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
});

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

recipeRouter.put(
  "/:id",
  checkJWT,
  validate(putRecipeSchema),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = req.user;
      const recipe = await Recipe.findById(id);
      if (!recipe.user.equals(user)) {
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
  }
);

recipeRouter.delete("/:id", checkJWT, async (req, res, next) => {
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
