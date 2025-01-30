import Joi from "joi";

const defaultRecipe = {
  bannerImage: Joi.string().allow("").optional(),
  public: Joi.boolean().optional(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.empty": "Ingredient name is required",
        }),
        quantity: Joi.string().required().messages({
          "string.empty": "Ingredient quantity is required",
        }),
        unit: Joi.string().optional(),
      })
    )
    .required()
    .messages({
      "array.base": "Ingredients must be an array",
      "any.required": "Ingredients are required",
    }),
  instructions: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required().messages({
          "string.empty": "Instruction text is required",
        }),
        images: Joi.array().items(Joi.string().optional()).optional(),
      })
    )
    .required()
    .messages({
      "array.base": "Instructions must be an array",
      "any.required": "Instructions are required",
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

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const putRecipeSchema = Joi.object({
  _id: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "Invalid MongoDB ObjectId format",
    "any.required": "_id is required to update the recipe",
  }),
  title: Joi.string().optional().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description is required",
  }),
  ...defaultRecipe,
});
