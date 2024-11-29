import Joi from "joi";

const defaultRecipe = {
  bannerImage: Joi.string().optional(),
  public: Joi.boolean().optional(),
  ingredients: Joi.string()
    .custom((value, helpers) => {
      try {
        return JSON.parse(value); // Validate and parse JSON
      } catch {
        return helpers.error("any.invalid");
      }
    })
    .messages({
      "any.invalid": "Ingredients must be a valid JSON string",
    }),
  instructions: Joi.string()
    .custom((value, helpers) => {
      try {
        return JSON.parse(value); // Validate and parse JSON
      } catch {
        return helpers.error("any.invalid");
      }
    })
    .messages({
      "any.invalid": "Instructions must be a valid JSON string",
    }),
};

export const postRecipeSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  ...defaultRecipe,
});

export const putRecipeSchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description is required",
  }),
  ...defaultRecipe,
});
