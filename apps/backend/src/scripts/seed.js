import { connectToDB } from "../db.js";
import { Tag } from "../models/tag.js";
import { faker } from "@faker-js/faker";
import { createHash } from "crypto";
import { User } from "../models/user.js";
import { Recipe } from "../models/recipe.js";
import dotenv from "dotenv";

dotenv.config();

async function seedTags() {
  await Tag.deleteMany();
  const tags = ["Dessert", "Soup", "Fish"];
  const result = [];
  for (const tag of tags) {
    const savedTag = await Tag.create({ name: tag });
    result.push(savedTag);
  }
  return result;
}

async function seedUsers() {
  await User.deleteMany();
  const result = [];
  for (let i = 0; i < 3; i++) {
    const user = {};
    const firstName = faker.person.firstName();
    user.username = faker.person
      .fullName({ firstName })
      .replaceAll(" ", "-")
      .toLowerCase();
    user.nickname = firstName;
    const sha256 = createHash("sha256");
    const hash = sha256.update("password").digest("hex");
    user.password = hash;
    const savedUser = await User.create(user);
    result.push(savedUser);
  }
  const user = {};
  const firstName = faker.person.firstName();
  user.username = "test";
  user.nickname = firstName;
  const sha256 = createHash("sha256");
  const hash = sha256.update("password").digest("hex");
  user.password = hash;
  const savedUser = await User.create(user);
  result.push(savedUser);
  return result;
}

async function seedRecipes(user, tags) {
  await Recipe.deleteMany();
  const result = [];
  for (let i = 0; i < 5; i++) {
    const recipe = {};
    recipe.title = faker.food.dish();
    recipe.description = faker.food.description();
    recipe.tags = tags;
    recipe.user = user._id;
    recipe.ingredients = [];
    for (let j = 0; j < 5; j++) {
      const ingredient = {
        unit: faker.helpers.arrayElement(["ml", "l", "g", "kg", "TL", "EL"]),
        quantity: faker.number.int({ max: 200 }),
        name: faker.food.ingredient(),
      };
      recipe.ingredients.push(ingredient);
    }
    recipe.instructions = [];
    for (let k = 0; k < 5; k++) {
      const instruction = {
        description: `${k + 1} ${faker.lorem.sentences(2)}`,
      };
      recipe.instructions.push(instruction);
    }
    recipe.public = faker.helpers.arrayElement([true, false]);
    const savedRecipe = await Recipe.create(recipe);
    result.push(savedRecipe);
  }
  return result;
}

async function main() {
  await connectToDB();
  const tags = await seedTags();
  const users = await seedUsers();
  for (const user of users) {
    await seedRecipes(user, [faker.helpers.arrayElement(tags)]);
  }
}

main().then(() => process.exit(0));
